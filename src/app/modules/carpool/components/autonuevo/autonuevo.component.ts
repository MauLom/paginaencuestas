import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { RequestService } from 'src/app/services/request.service';


@Component({
  selector: 'app-autonuevo',
  templateUrl: './paginaDinamica.html',
  styleUrls: ['./autonuevo.component.css']
})
export class AutonuevoComponent implements OnInit {
  /*formulario
  //objetoDatos: object;
  //email: string;
  //nombre: string;
  //appaterno: string;
  //apmaterno: string;
  //iniciales: string;
  //telefono: number;
  //quattroTask: string;
*/
  constructor(
    public dialogRef: MatDialogRef<AutonuevoComponent>,
    public requestServices: RequestService,
  ) { }
  public esInicio = false;
  public pregunta1 = false;
  public pregunta2 = false;
  public pregunta3 = false;
  public textoVisible = '';
  public textoVisible1 = '';
  public textoVisible2 = '';
  public arrOpcionesProgramacion: any;
  public variable = 0;
  public iniciarEncuesta = false;
  public textoDeBoton = "Sin definir";

  ngOnInit() {

    this.obtencionDeDatos();
  }

  obtencionDeDatos() {
    let data = {
      'parametro1': '0',
    }
    // this.requestServices.getRequest("nombredelaapi",data).subscribe(result=>{
    //    console.log('el resultado', result)
    //this.objetoPagina=result       
    //})


    /// GUIA DE TIPOS: 
    //0 inicio, 1 formularios con checkbox, 2 comentarios en caja de texto, 3 calificacion

    let result = {
      'tipo': 2,

      'contenido':
        "",
      'textoDeBoton': "CONTINUAR", 
      'opciones': [
        {
          't': "Ventas",
          'a': 1
        },
        {
          't': "Cotizaciones",
          'a': 2
        },
        {
          't': "Emisiones",
          'a': 3
        }],

      'radiobutton': [
        {
          't': "Cobranza",
          'a': 4
        },
        {
          't': "Renovaciones",
          'a': 5
        },
        {
          't': "Siniestros",
          'a': 6
        },
        {
          't': "Conciliaciones",
          'a': 7
        },
        {
          't': "Administracion General",
          'a': 8
        },
        {
          't': "Fianzas",
          'a': 9
        },
      ],

      'selectOption': [
        { 
          't': 'NA',
          'a': 'NA',
          't1': "Comentar en general de la aplicacion quattroCRM",
          't2': "Captura de polizas",
          't3': "Configuracion de paquetes",
          't4': "Importacion de Layouts",
          't5': "Cobranza",
          't6': "Renovaciones",
          't7': "Siniestros Salud",
          't8': "Siniestros Autos",
          't9': "Siniestros Diversos",
          't10': "Conciliaciones",
          't11': "Modulo de tareas CRM",
          't12': "Fianzas",
          't13': "App Movil quattroTask",
          't14': "App Movil MiPoliza",
        },
        {
          't': "Comentar en general de la aplicacion quattroCRM",
          'a': 'id1'
        },
        {
          't': "Captura de polizas",
          'a': 'id2'
        },
        {
          't': "Llena esto con contenido de arriba",
          'a': 'SinDefinir'
        },
      ],

      'selectOption1': [
        {
          't1': "No la conozco",        
          't2': "No se en que me puede ayudar",        
          't3': "Las funciones que tiene no son suficientes",        
          't4': "Me parece adecuada para su objetivo",        
          't5': "Esta bien pero puede mejorar",        
          't6': "No me parece que cumpla el objetivo",          
        },
      ],
    }

    switch (result.tipo) {
      case 0: /// Es Inicio
        this.esInicio = true;
        this.textoVisible = result.contenido;
        this.textoDeBoton = result.textoDeBoton;

        break;
      case 1: /// Formulario con checkbox
        this.pregunta1 = true;
        this.textoVisible =
          "<div>" +
          "¿Que funciones atiendes en el despacho?" +
          "</div></br>"

        this.textoDeBoton = result.textoDeBoton;
        this.arrOpcionesProgramacion = result.opciones;
        break;
      case 2: /// Seleccion con comentarios
        this.pregunta2 = true;
        this.textoVisible =
          "<div>" +
          "¿Deseas comentar sobre que se podria mejorar en algun modulo en especial?" +
          "</div></br>"

        this.textoDeBoton = result.textoDeBoton
        this.arrOpcionesProgramacion = result.selectOption;
        break;
      case 3: /// doble seleccion
        this.pregunta3 = true;
        this.textoVisible =
          "<div>" +
          "¿Cual es tu opinion de nuestras aplicaciones moviles?"
        "</div></br>"

        this.textoVisible1 = 
        "<div>" +
          "quattroTask"
        "</div></br>"

        this.textoVisible2 = 
        "<div>" +
          "MiPoliza"
        "</div></br>"

        this.textoDeBoton = result.textoDeBoton;
        this.arrOpcionesProgramacion = result.selectOption1
        break;
    }

  }

  funcionInutil(data) {
    console.log("Esta funcion es inutil. ")

  }
}

/*formulario
  Salida(){
  this.dialogRef.close({
  email: this.email,
  nombre: this.nombre,
  appaterno: this.appaterno,
  apmaterno: this.apmaterno,
  iniciales: this.iniciales,
  telefono: this.telefono,
  quattroTask: this.quattroTask
  })
  }*/

