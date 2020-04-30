import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, ViewChild, OnInit } from "@angular/core";

@Directive({
    selector: '[resize]'
})
export class ReSize {
    @Input() resize: boolean;
    @Input() restar: number = 30;
    @Input() width: number = 0
    id: string;
    elementRefNuevo: HTMLElement

    constructor(
        private elementRef: ElementRef,
    ) {
        this.elementRefNuevo = elementRef.nativeElement;

    }
    ngOnInit() {
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

        let y = display.offsetHeight;
        let x = (display.offsetWidth * .95);

        element.style.cssText = "height:" + (y - (element.getBoundingClientRect().top + this.restar)) + "px;";
        //element.style.cssText += "width:" + x + "px;";

        if (this.width < x) {
            element.style.cssText += "width:" + (this.width + 18) + "px;";
        } else {
            element.style.cssText += "width:" + x + "px; margin: auto;";
        }
    }
}