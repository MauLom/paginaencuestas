import { Directive, ElementRef, HostListener, EventEmitter, Renderer2 } from "@angular/core";

@Directive({
    selector:"[dragandrop]",
    outputs:[
        "ddresult:ddResult"
    ],
    host:{
        '(click)':'clickInput(); $event.stopPropagation();'
    }
})
export class SioDragDropDirective{
    host:HTMLElement;
    public value:string="";
    private initialFile:File;
    private colorA:string="#3498db";
    private colorB="#dbf5ff";
    private _property:any[]=["primary", "base"];
    public ddresult:EventEmitter<any>;
    public ddfile:EventEmitter<any>;
    private sioEventEmitter:SioEventEmitterService = new SioEventEmitterService();
    private _inputFile:HTMLElement;

    constructor(private element:ElementRef, private render2:Renderer2){
        this.host = element.nativeElement;
        this.ddresult=new EventEmitter();        
    }

    @HostListener("dragover",["$event"]) ondragover(event){
        this.stopProp(event);
        event.dataTransfer.dropEffect = 'copy';
    }

    @HostListener("drop", ["$event"]) ondrop(event){
        this.stopProp(event);
        this.chargeImage(event.dataTransfer.files.item(0));
    }

    @HostListener("change",["$event"]) onchange(event){
        this.stopProp(event);
        this.chargeImage(event.target.files.item(0));
    }

    private chargeImage(file:File){
        this.loaderOn();
        if(file != null){
            try{
                var reader = new FileReader();
                reader.onloadend = (e) => {
                    this.sioEventEmitter
                    .emit(reader.result)
                    .then((value:any):void=>{
                        this.ddresult.emit({ blob:value, file:file });
                    });          
                };
                this.loaderOff();
                reader.readAsDataURL(file);
            }catch(ex){
                this.loaderOff();
                this.sioEventEmitter
                .emit(ex+"")
                .then((value:string):void=>{
                    this.ddresult.emit({ error:value, file:null });
                });
            }
        }else{
            this.loaderOff();
            this.sioEventEmitter
            .emit("cancelacion")
            .then((value:string):void=>{
                this.ddresult.emit({ error:value, file:null });
            });
        }                
    }

    private stopProp(event){
        event.stopPropagation();
        event.preventDefault();
    }

    private loaderOn(){
        let loaderHTML = "<div style=\"position:absolute; width:50px; height:50px; top:calc(50% - 65px); left:calc(50% - 25px);\"><div style=\"border:8px solid "+this.colorB+"; border-radius:50%; border-top:8px solid "+this.colorA+"; width:50px; height:50px; -webkit-animation:spin 1s linear infinite; animation: spin 1s linear infinite;\"></div></div>";
        this.host.insertAdjacentHTML('beforeend',loaderHTML);
    }

    private loaderOff(){
        this.host.removeChild(this.host.lastChild);
    }

    private clickInput(){
        this._inputFile = <HTMLElement>this.host.querySelector('input[type=file]');
        this._inputFile.click();
        
    }
}

class SioEventEmitterService{

    constructor() {}

    public emit(value:any):Promise<any>{
        var promise:Promise<any>;
        promise = new Promise((resolve, reject):void=>{
            resolve(value);
        });
        return promise;
    }

}