import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from './services/app-service';
import { Constant } from './modules/utilities/constants';
import { RequestService } from './services/request.service';

interface Opcion {
  type: number,
  path: string,
  icon: string,
  viewValue: string,
  disabled: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public constant:Constant = new Constant();
  public avatar:string = "";
  public nombres:string = "";
  public menuShow: boolean = false;
  public active;
  public logo = "";
  public logoNeg = "";
  opciones: Opcion[] = [
    {type: 1, path: '/inicio', icon: 'home', viewValue: 'Inicio', disabled: false },
    {type: 2, path: '/carpool', icon: 'directions_car', viewValue: 'Carpool', disabled: false },
      
  ];
  public dlog:any;

  constructor(private activeRoute: ActivatedRoute, private appService: AppService, private router: Router, private snackBar: MatSnackBar, private requestService:RequestService) {    
    this.activeRoute.queryParams.subscribe(params => {
      if(params){
        if(params.dlog) this.dlog=params.dlog;
        if(params["w1"]){
          localStorage.setItem("w", params["w1"]);
          this.appService.navigationService.common$.subscribe((path) => {
            this.router.navigate([path]);
          });
          this.cargarInicio();
        }
      }
    });
    if(localStorage.getItem("w")){
      this.cargarInicio();
    }
  }

  ngOnInit() {
    //new Constant().setLocalStorage("iR024oI0a5FqhedMwGrIFaF+oS81Y/0qMBNiUgoKtovrRBb97Bw2JDP40n1WrlE5");
  }

  cargarInicio() {
    this.requestService.getRequest("WorksiteInicioAPI").subscribe(result => {
      if (result.error) {
        if (result.usuario) {
          this.snackBar.open(result.error, "", { duration: 4000 });
        } else {
          this.snackBar.open("Ocurrió un problema durante el proceso", "", { duration: 4000 });
          console.error("error: ", result.error);
        }
      } else {
        if (result) {
          this.logoNeg =  result[0].c2;
          this.nombres = result[0].c4;
          this.avatar = result[0].c5;
          this.logo = result[0].c6;
        }
      }
    })
  }
}
