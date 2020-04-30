import { Component, EventEmitter, ElementRef, ViewChild } from "@angular/core";
import { RequestService } from '../../../../services/request.service';

@Component({
  selector: 'buscador-cotizador',
  templateUrl: './buscador-cotizador.component.html',
  styleUrls: ['./buscador-cotizador.component.css'],
  inputs:['debug', 'apiName', 'remoteName', 'data', 'abrevia', 'minLetras', 'isSelect'],
  outputs:['textValue', 'redirect', 'focus', 'keyup']
})
export class BuscadorCotizadorComponent {
  @ViewChild('buscadorSioCot') buscadorSioCot:ElementRef;
  debug: boolean = false;
  apiName:string = "";
  isSelect:boolean=false;
  remoteName:string = "";
  data:Array<any> = [];
  abrevia:String = "";
  minLetras:number=3;
  textValue = new EventEmitter();
  redirect = new EventEmitter<any>();
  searchResult:Array<any> = Array<any>();
  searchEnabled = false;
  selected = undefined;
  strSearch = "";
  textoTemporal = "";
  keypressTimeout: any;
  text:String;
  focus = new EventEmitter();
  keyup = new EventEmitter<any>();

  constructor(private requestService: RequestService) { }  

  searchKeyUp(e) {
    this.log("e", e.target.value)
    if (e.target.value.trim() == "") {
      this.selected = undefined;
      this.searchResult = [];
      this.searchEnabled = false;
      this.keyup.emit(0);
    } else {
      var x1: string = "";
      var tecla = 0;
      x1 = e.target.value.trim();
      x1 = x1.replace(/[ ]/g, "%25");
      tecla = e.keyCode;
      this.keyup.emit(x1.length);
      
      if (tecla == 13) {
        if (this.selected != undefined) {
          this.getDetalle(this.selected);
        } else {
          if (!isNaN(parseInt(e.target.value)) && String(e.target.value).indexOf("-") == -1) {
            this.getDetalle(parseInt(e.target.value));
          }
        }
      //} else if (tecla == 48 || tecla == 49 || tecla == 50 || tecla == 51 || tecla == 52 || tecla == 53 || tecla == 54 || tecla == 55 || tecla == 56 || tecla == 57 || tecla == 96 || tecla == 97 || tecla == 98 || tecla == 99 || tecla == 100 || tecla == 101 || tecla == 102 || tecla == 103 || tecla == 104 || tecla == 105) {
        // Son números, no hacer nada
      } else {
        // Alguna letra                 
        if (tecla == 38 || tecla == 40) {
          if (tecla === 40) {
            if (this.searchResult.length > 0) {
              if (this.selected == undefined) {
                this.searchResult[0]["selected"] = true;
                this.strSearch = this.searchResult[0]["c3"];
                this.selected = 0;
              } else if (this.searchResult.length > (this.selected + 1)) {
                this.searchResult[this.selected]["selected"] = false;
                this.selected = this.selected + 1;
                this.searchResult[this.selected]["selected"] = true;
                this.strSearch = this.searchResult[this.selected]["c3"];
              }else if (this.searchResult.length == (this.selected + 1)){
                this.searchResult[this.selected]["selected"] = false;
                this.selected = undefined;
                this.strSearch = this.textoTemporal;
              }
            }
          } else {
            if (this.searchResult.length > 0) {
              if (this.selected != undefined) {
                if (this.selected == 0) {
                  this.searchResult[0]["selected"] = false;
                  this.selected = undefined;
                  this.strSearch = this.textoTemporal;
                } else {
                  this.searchResult[this.selected]["selected"] = false;
                  this.selected = this.selected - 1;
                  this.searchResult[this.selected]["selected"] = true;
                  this.strSearch = this.searchResult[this.selected]["c3"];
                }
              }else{
                this.selected = (this.searchResult.length - 1);
                this.searchResult[this.selected]["selected"] = true;
                this.strSearch = this.searchResult[this.selected]["c3"];
              }
            }
          }
          e.preventDefault();
          return;
        }else{
          this.textoTemporal = this.strSearch;
        }
        if (e.target.value != "" && x1.length > this.minLetras) {
          clearTimeout(this.keypressTimeout);
          this.keypressTimeout = setTimeout(() => {
              if (x1.length >= this.minLetras) {                          
                this.filtroBusqueda(x1, (tecla == 8));
              }
          }, 350); 
        }
      }
    }
  }

  handlerIgnored(e){
    if (this.searchResult.length > 0) {
      if (e.keyCode === 38 || e.keyCode === 40){
        e.preventDefault();
      }
    }
  }

  txHandler(opc: boolean) { 
    setTimeout(() => {
      if (opc) {
        if(this.isSelect && this.strSearch != ""){
          this.buscadorSioCot.nativeElement.select();
        }
        this.selected = undefined;
        this.searchResult = [];
        this.searchEnabled = false;  
        
        this.focus.emit();

      } else {
        this.selected = undefined;
        this.searchResult.forEach(element => {
          element.selected = false;
        });
        this.searchEnabled = false      
      }  
    }, 400);
  }

  getDetalle(idx: number) {
    this.log("getDetalle", idx);
    this.log("getDetalle", JSON.stringify(this.searchResult));
    this.strSearch=this.searchResult[idx].descripcion;
    this.redirect.emit({"c1":this.searchResult[idx]});
    this.selected = undefined;
    this.searchResult = [];
    this.searchEnabled = false;
  }

  limpiarInput() {
    this.strSearch = "";
    this.selected = undefined;
    this.searchResult = [];
    this.searchEnabled = false;
    this.textValue.emit("");
  }


  private filtroBusqueda(search: string, isBack:boolean){
    this.requestSearch(search, isBack);
  }

  requestSearch(search: string, isBack:boolean) {
    var parameter
    if(this.remoteName == ""){
      parameter = [{ "search": search }]
      this.requestService.getRequest(this.apiName, parameter).subscribe(
        result => {
          if(result.error){
            this.selected = undefined;
            this.searchEnabled = true;
            this.searchResult = [];
            console.error(result);
          }else{
            this.selected = undefined;
            this.searchEnabled = true;
            this.searchResult = result;
            if(this.searchResult.length == 1 && !isBack){
              this.selected = 0;
              this.getDetalle(this.selected);
            }
          }
        }, error => {
          this.selected = undefined;
          this.searchEnabled = true;
          this.searchResult = [];
          console.error(error);
        }
      );
    }else{
      if(this.data.length > 0){
         parameter = [{ "d": search }]
        for(let arr of this.data){
          parameter.push(arr)
        }  
      }else{
        parameter = [{ "search": search }]
      }
         
      this.requestService.getRequestRemote(this.remoteName, this.apiName, parameter).subscribe(
        result => {
          if(result.error){
            this.selected = undefined;
            this.searchEnabled = true;
            this.searchResult = [];
          }else{
            this.selected = undefined;
            this.searchEnabled = true;
            this.searchResult = result;
            if(this.searchResult.length == 1 && !isBack){
              this.selected = 0;
              this.getDetalle(this.selected);
            }
          }
        }, error => {
          this.selected = undefined;
          this.searchEnabled = true;
          this.searchResult = [];
          console.error(error);
        }
      );
    }
  }

  private log(evento: string, message?: any) {
    if (this.debug == true) {
      if(message){
        console.log(evento, message);
      }else{
        console.log(evento);
      }
    }
  }
}
