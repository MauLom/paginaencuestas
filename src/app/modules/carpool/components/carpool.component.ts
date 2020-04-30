import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AutonuevoComponent } from './autonuevo/autonuevo.component';

@Component({
  selector: 'app-carpool',
  templateUrl: './carpool.component.html',
  styleUrls: ['./carpool.component.css']
})
export class CarpoolComponent implements OnInit {
  public valor = true;
  public jsonFake: any = {
    "cuerpo": [
      [   /// Inicia Primer item Head
        {
          "C1": {
            "tipo": "v",
            "s": false,
            "param": "",
            "v": "Cuenta de Correo/Usuario",
            "f": false,
            "className": "col",
            "n": "c13"
          },
          "C2": {
            "tipo": "v",
            "s": false,
            "param": "",
            "v": "Nombre(s)",
            "f": false,
            "className": "col",
            "n": "c4"
          },
          "C3": {
            "tipo": "v",
            "s": false,
            "param": "",
            "v": "Apellido paterno",
            "f": false,
            "className": "col",
            "n": "c5"
          },
          "C4": {
            "tipo": "v",
            "s": false,
            "param": "",
            "v": "Apellido materno",
            "f": false,
            "className": "col",
            "n": "c6"
          },
          "C5": {
            "tipo": "status",
            "s": false,
            "param": "",
            "v": "Iniciales",
            "f": false,
            "className": "col",
            "n": "c11"
          },
          "C6": {
            "tipo": "v",
            "s": false,
            "param": "",
            "v": "Celular",
            "f": false,
            "className": "col",
            "n": "c2"
          },
          "C7": {
            "tipo": "v",
            "s": false,
            "param": "",
            "v": "quattroTask",
            "f": false,
            "className": "col",
            "n": "c4"
          },
        }
      ], /// Acaba PRIMER item  
      [ /// Inicia SEGUNDO item Body
        {
           "C1": {
             "v": "pedro",
             "key": "llave primaria"
           },
           "C2": {
             "v": "8:00"
           },
           "C3": {
             "v": "Ocupado"
           },
           "C4": {
             "v": "Libre"
           },
           "C5": {
             "v": "adios"
           },
           "C6": {
             "v": "hola"
           },
           "C7": {
             "v": "hola"
           }
        },
        {
          "C1": {
            "v": "Marco",
            "key": "llave secundaria"
          },
          "C2": {
            "v": "9:00."
          },
          "C3": {
            "v": "Ocupado"
          },
          "C4": {
            "v": "Libre"
          },
          "C5": {
            "v": "Libre"
          },
          "C6": {
            "v": "N/D"
          },
          "C7": {
            "v": "hola"
          }
        },
        {
          "C1": {
            "v": "Andres",
            "key": "llave terciaria"
          },
          "C2": {
            "v": "10:00."
          },
          "C3": {
            "v": "Ocupado"
          },
          "C4": {
            "v": "Libre"
          },
          "C5": {
            "v": "Libre"
          },
          "C6": {
            "v": "N/D"
          },
          "C7": {
            "v": "hola"
          }
        },
      ], /// Acaba segundo item 
      [ /// TERCER item Footer
        {
          "next": 20,
          "de": 10,
          "total": 10,
          "back": 0,
          "saltos": 20
        }
      ]
    ]

  }
  public dataGrid = [];

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.cargarDatos()
  }

  cargarDatos() {
    this.dataGrid = this.jsonFake.cuerpo
  }
  //agrega nuevo usuario
  abrirModal() {
    let modalAuto: any = this.dialog.open(AutonuevoComponent, { width: '600px', height: '500px' })
    modalAuto.componentInstance.objetoDatos = {}
    modalAuto.afterClosed().subscribe(result => {
      console.log("Resultado es=>", result)
      this.jsonFake.cuerpo[1]
      let guardar = {
        "C1": {
          "v": result.email,
          "key": "llave cuarta"         
        },
        "C2": {
          "v":  result.nombre
        },
        "C3": {
          "v": result.appaterno
        },
        "C4": {
          "v": result.apmaterno
        },
        "C5": {
          "v": result.iniciales
        },
        "C6": {
          "v": result.telefono
        },
        "C7": {
          "v": result.quattroTask
        }
      }
      console.log("jsonFake", this.jsonFake.cuerpo[1])
      this.jsonFake.cuerpo[1].push(guardar)      
    })
  }
  
   //trae los campos para modificar
   /*
  funcion(data) {
    console.log("lo que trae el evento =>", data)
     let elementoSeleccionado:any = this.jsonFake.cuerpo[1][data.index]
<<<<<<< Updated upstream
     let modal = this.dialog.open(AutonuevoComponent, {width: '600px', height: '500px'})
    modal.componentInstance.email = elementoSeleccionado.C1.v
    modal.componentInstance.nombre = elementoSeleccionado.C2.v
    modal.componentInstance.appaterno = elementoSeleccionado.C3.v
    modal.componentInstance.apmaterno = elementoSeleccionado.C4.v
    modal.componentInstance.iniciales = elementoSeleccionado.C5.v
    modal.componentInstance.telefono = elementoSeleccionado.C6.v
    modal.componentInstance.quattroTask = elementoSeleccionado.C7.v
<<<<<<< HEAD
/
    modal.afterClosed().subscribe(result => {console.log("resultado es =>", result) 
=======

    modal.afterClosed().subscribe(result => {console.log("Resultado es =>", result) 
>>>>>>> 7acc2db385add2abebba95d8f1a829e5d1f5a4eb
=======
     
    
     let modal = this.dialog.open(AutonuevoComponent, { width: '400px', height: '600px' })
    // modal.componentInstance.email = elementoSeleccionado.C1.v
    // modal.componentInstance.nombre = elementoSeleccionado.C2.v
    // modal.componentInstance.appaterno = elementoSeleccionado.C3.v
    // modal.componentInstance.apmaterno = elementoSeleccionado.C4.v
    // modal.componentInstance.iniciales = elementoSeleccionado.C5.v
    // modal.componentInstance.telefono = elementoSeleccionado.C6.v
    // modal.componentInstance.quattroTask = elementoSeleccionado.C7.v

    modal.afterClosed().subscribe(result => {
      console.log("Resultado es =>", result) 
>>>>>>> Stashed changes
      this.jsonFake.cuerpo[1][data.index].C1.v = result.email
      this.jsonFake.cuerpo[1][data.index].C2.v = result.nombre
      this.jsonFake.cuerpo[1][data.index].C3.v = result.appaterno
      this.jsonFake.cuerpo[1][data.index].C4.v = result.apmaterno
      this.jsonFake.cuerpo[1][data.index].C5.v = result.iniciales
      this.jsonFake.cuerpo[1][data.index].C6.v = result.telefono
      this.jsonFake.cuerpo[1][data.index].C7.v = result.quattroTask
    })
*/
  }



