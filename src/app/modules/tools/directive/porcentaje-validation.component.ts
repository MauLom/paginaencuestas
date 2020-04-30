import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from "@angular/core";

@Directive({
    selector: '[porcentaje-sio]'
})

export class ValidationPorcentaje{
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
    @Input() maxlengthDecimal;
    @Input() maxlengthNumber;
    host:any;

    constructor(private element: ElementRef) {
        this.host = element.nativeElement;
    }

    @HostListener('focus', ['$event']) onfocus(event){
        this.element.nativeElement.style.textAlign = "right";
        event.target.select();
    }

    @HostListener('keydown', ['$event']) onKeyDown(event){
        let e = <KeyboardEvent> event;
        let valor
        if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode == 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode == 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }        
        //No permite el (_)
        if (e.keyCode == 189) {
            e.preventDefault();
        }
        
        // Ensure that it is a number and stop the keypress
        if(this.maxlengthNumber){
            if(event.target.value.indexOf(".") == -1){
                if((event.target.value.length + 1) > this.maxlengthNumber){
                    e.preventDefault();
                }
            }else{
                if((event.target.value.split(".")[0].length + 1) > this.maxlengthNumber){
                    e.preventDefault();
                }
            }
        }
        valor = event.target.value.indexOf(".");
        if (valor == -1 && (e.keyCode == 110 || e.keyCode == 190)) {
            return;
        } 
        if(this.maxlengthDecimal){ 
            if(event.target.value.indexOf(".") == -1){
                return;
            }else{
                if((event.target.value.split(".")[1].length + 1) > this.maxlengthDecimal){
                    e.preventDefault();
                }
            }
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105 )) {
            e.preventDefault();
        }
    }

    @HostListener('keyup', ['$event']) onkeyup(event){
        var valor = event.target.value;        
        let valorNuevo;
        if(valor>100){
            valorNuevo = 100;
            this.ngModelChange.emit(valorNuevo);
        }else{
            
        }
    }

    /* @HostListener('blur', ['$event']) onblur(event){
        if(event.target.value.length > 0){

        }else{
            this.ngModelChange.emit(0);
        }
    } */
}