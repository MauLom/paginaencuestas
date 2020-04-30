import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-simple-message',
  templateUrl: './simple-message.component.html',
  styleUrls: ['./simple-message.component.css']
})
export class SimpleMessageComponent implements OnInit {
  public message:String='';
  public accion:String='';
  public cancel:String='';

  constructor(public modalRef: MatDialogRef<SimpleMessageComponent>) { }

  ngOnInit() {
    
  }

}
