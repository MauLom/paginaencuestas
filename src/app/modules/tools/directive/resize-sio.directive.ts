import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, ViewChild, OnInit } from "@angular/core";

@Directive({
    selector: '[resize-sio]'
})
export class ReSizeDirective{
    @Input() resize:boolean;
    @Input() restar:number = 30;
    id:string;
    elementRefNuevo: HTMLElement

    constructor(
                private elementRef:ElementRef,
            ) { 
                this.elementRefNuevo=elementRef.nativeElement;
                    
                }
    ngOnInit(){
        setTimeout(() => {
           this.AjustarPantalla();
        }, 300);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.AjustarPantalla();
    }
  
    AjustarPantalla() {    
        let display = <HTMLElement>document.querySelector('body');
        let element = <HTMLElement>document.getElementById(this.elementRefNuevo.id);

        let x = display.offsetHeight;    
        let y = display.offsetWidth;    
        element.style.cssText = "height:" + (x - (element.getBoundingClientRect().top + this.restar)) + "px;";
        //element.style.cssText += "width:" + (y - (element.getBoundingClientRect().left + 30)) + "px;";
    }
}