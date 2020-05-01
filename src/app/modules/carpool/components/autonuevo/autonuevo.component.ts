import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { RequestService } from 'src/app/services/request.service';
import { fakesClass } from '../autonuevo/claseConFakes';

@Component({
  selector: 'app-autonuevo',
  templateUrl: './autonuevo.component.html',
  styleUrls: ['./autonuevo.component.css']
})
export class AutonuevoComponent extends fakesClass implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AutonuevoComponent>,
    public requestServices: RequestService,
  ) {
    super();
  }

  ngOnInit() {

  }

  funcionInutil(min, max) {
    let numeroSupuestamenteAleatorio = this.generaObjetoPagina(1);
    console.log("Ya no es tan inutil => ", numeroSupuestamenteAleatorio)

  }
}