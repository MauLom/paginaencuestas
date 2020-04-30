import { Directive, Input, EventEmitter, ElementRef, Renderer, Inject, OnInit } from "@angular/core";

@Directive({
    selector: "[myFocusElement]"
})
export class InputFocusComponent {
    @Input() myFocusElement:boolean;

    constructor(@Inject(ElementRef) private element: ElementRef) {}
    protected ngOnChanges() {
        this.element.nativeElement.focus();
    }
}