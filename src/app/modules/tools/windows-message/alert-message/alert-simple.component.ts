import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'alert-message',
    template: `
    <div class="table-sio modal-alert-message">        
        <div class="row-sio">
            <!-- <div class="cell-sio py-10x px-20x align-bottom text-center">{{message}}</div> -->
            <div class="cell-sio">
                <div class="container">
                    <div class="row align-items-start">
                        <div class="col px-10x text-right basic-web-button-close">
                            <button mat-icon-button tabindex="-1" (click)="modalRef.close(false)">
                                <mat-icon>close</mat-icon>
                            </button>
                        </div>
                    </div>
                    <div class="row align-items-end">
                        <div class="col">{{message}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `,
    styles: [`
    .modal-alert-message{
        width: 320px;
        height: 170px;
    }
  `]
})
export class AlertMessageComponent implements OnInit {
    public message:String='';
    public accion:String='';
    public cancel:String='';

    constructor(public modalRef: MatDialogRef<AlertMessageComponent>) { }

    ngOnInit() {

    }

}