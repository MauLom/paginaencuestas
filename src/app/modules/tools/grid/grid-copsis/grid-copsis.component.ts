import {
  Component, OnInit, Input, Output, EventEmitter,
  AfterViewChecked,
  HostListener
} from '@angular/core';
import { EncryptConstants } from 'src/app/modules/utilities/constants';

@Component({
  selector: 'grid-copsis',
  templateUrl: './grid-copsis.component.html',
  styleUrls: ['./grid-copsis.component.css']
})
export class GridCopsisComponent implements OnInit, AfterViewChecked {
  @Output() btnOptionsGrid = new EventEmitter();
  @Output() btnBackGrid = new EventEmitter<any>();
  @Output() btnNextGrid = new EventEmitter<any>();
  @Output() btnSearchGrid = new EventEmitter();
  @Output() btnDescargarGrid = new EventEmitter();
  @Output() rowSelected = new EventEmitter<any>();
  @Output() seguimientoSelected = new EventEmitter<any>();
  @Output() radioSelected = new EventEmitter<any>();
  @Output() btnRdReal = new EventEmitter();
  @Output() btnCkReal = new EventEmitter();
  @Output() actionCheckbox = new EventEmitter<any>();
  @Input() idGrid: string = "";
  @Input() dataSource: any;
  @Input() dataHeader: any;
  @Input() heightGrid: number = 0;
  @Input() TotalRow: number = 0;
  @Input() fil_name: string = "";
  @Input() filtro: string = "";
  @Input() isDownloadEnabled: boolean = false;
  @Input() debug: boolean = false;
  @Input() emptyState: string = "No se encontraron resultados";
  @Input() emptyStateButton: string = "";
  @Input() calcularHeight: boolean = true;
  @Input() heightRow:number = 46;
  @Input() imageEmptyState:string = "";
  @Input() radioValue:string = "";
  public rowSelectedItem: string = new EncryptConstants().ZERO;
  private temporalDataSource;
  back: number = 0;
  next: number = 0;
  buscar: string = "";
  col_name: string = "";
  inputSearch: string = "";
  isVisible: boolean = false;
  differ: any;
  BooleanAfterViewInit = false;
  //widthRows:number = 0;
  public myFocusTriggeringEventEmitter = false;
  public contentScroll:any = 0;
  public rdCheqed:string="";
  public ckCheqed:string="";
  @HostListener('scroll', ['$event'])
  private onScroll($event: Event): void {
    let content = <HTMLElement>document.querySelector('#dvHeaderScroll' + this.idGrid);
    this.contentScroll = $event.srcElement.scrollLeft;
    content.scrollLeft = this.contentScroll;
  };

  constructor() {
  }

  ngOnInit() {
    this.temporalDataSource = this.dataSource;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.AjustarPantalla();
    }, 100);
  }

  ngAfterViewChecked() {
    if (this.temporalDataSource) {
      if (this.temporalDataSource != this.dataSource) {
        this.temporalDataSource = this.dataSource
        setTimeout(() => {
          this.AjustarPantalla();
          let content = <HTMLElement>document.querySelector('#dvHeaderScroll' + this.idGrid);
          content.scrollLeft = this.contentScroll;
        }, 400);
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.AjustarPantalla();
  }

  AjustarPantalla() {
    try {
      if (this.dataSource && this.dataSource.length > 0 && this.dataSource[1].length > 0) {
        let contentGrid = <HTMLElement>document.querySelector('#dvGridContainer' + this.idGrid);
        let contentHeader = <HTMLElement>document.querySelector('#vwHeader' + this.idGrid);
        let contentBody = <HTMLElement>document.querySelector('#idBody' + this.idGrid);
        let content = <HTMLElement>document.querySelector('#idCont' + this.idGrid);
        contentHeader.style.width = "auto";
        contentBody.style.width = "auto";
        content.style.width = "auto";
        let widthBody: number = contentBody.offsetWidth;
        let heightBody: number = 0;
        if (this.TotalRow == 0) {
          contentBody.style.height = "auto";
          heightBody = contentBody.offsetHeight;

          let topGrid = contentGrid.getBoundingClientRect().top;
          let heightGrid = contentGrid.getBoundingClientRect().height;
          let alturaTotalGrid = topGrid + heightGrid;
          let heightWindow = window.innerHeight;

          this.log("*********************************************************");
          this.log("contentBody.offsetHeight", contentBody.offsetHeight);
          this.log("window.screen.height", window.innerHeight);
          this.log("contentGrid.getBoundingClientRect", contentGrid.getBoundingClientRect());
          this.log("body.getBoundingClientRect", document.body.getBoundingClientRect());
          this.log("alturaTotalGrid", alturaTotalGrid);
          this.log("heightWindow", heightWindow);
          if (alturaTotalGrid > heightWindow) {
            let difBodyGrid = heightGrid - heightBody;
            let difGridWindow = alturaTotalGrid - heightWindow;
            this.log("difBodyGrid", difBodyGrid);
            this.log("difGridWindow", difGridWindow);
            heightBody = heightBody - (difGridWindow + (difBodyGrid - 70));
            this.log("heightBody", heightBody);
          }
        } else {
          heightBody = (this.TotalRow > 0 && this.calcularHeight == true) ? ((this.TotalRow > this.dataSource[1].length ? this.dataSource[1].length : this.TotalRow) * this.heightRow) : (this.heightGrid > 0 && this.calcularHeight == true ? (this.heightGrid - (this.heightRow + 70)) : contentBody.offsetHeight);
        }
        let registros: number = (this.dataSource[1].length * this.heightRow);
        let elements = document.querySelectorAll('.gridColumnas' + this.idGrid);
        let width: number = 0;
        for (var index = 0; index < elements.length; index++) {
          let _element = <HTMLElement>elements[index];
          var w = _element.offsetWidth;
          width += w;
        }
        this.log("AjustarPantalla().contentBody", "heightBody: " + heightBody + ", registros: " + registros);
        this.log("AjustarPantalla().widthBody", "widthBody: " + widthBody + ", width: " + width);
        if ((widthBody - width) > 0) {
          width = widthBody;
        }
        if (heightBody >= registros) {
          contentHeader.style.width = (width) + "px";
          content.style.width = (width) + "px";
          contentBody.style.width = widthBody + "px";
        } else {
          if (navigator.platform.indexOf("Win") > -1) {
            if(widthBody < width){
              contentHeader.style.width = (width) + "px";
              content.style.width = (width) + "px";
            }else{
              contentHeader.style.width = (width - 17) + "px";
              content.style.width = (width - 17) + "px";
            } 
          } else if (navigator.platform.indexOf("Linux") > -1) {
            if(widthBody < width){
              contentHeader.style.width = (width) + "px";
              content.style.width = (width) + "px";
            }else{
              contentHeader.style.width = (width - 15) + "px";
              content.style.width = (width - 15) + "px";
            } 
          } else {
            if(widthBody < width){
              contentHeader.style.width = (width) + "px";
              content.style.width = (width) + "px";
            }else{
              contentHeader.style.width = (width - 15) + "px";
              content.style.width = (width - 15) + "px";
            }            
          }
          contentBody.style.width = widthBody + "px";
        }
        if (this.calcularHeight == true) {
          if (widthBody < width) {
            if (navigator.platform.indexOf("Win") > -1) {
              contentHeader.style.width = (width + 17) + "px";
              contentBody.style.height = (heightBody + 17) + "px";
            } else if (navigator.platform.indexOf("Linux") > -1) {
              contentHeader.style.width = (width + 15) + "px";
              contentBody.style.height = (heightBody + 15) + "px";
            } else {
              contentHeader.style.width = (width + 15) + "px";
              contentBody.style.height = (heightBody + 15) + "px";
            }
          } else {
            let contentHeight = content.offsetHeight;
            if (contentHeight > heightBody) {
              if (navigator.platform.indexOf("Win") > -1) {
                contentBody.style.height = (heightBody) + 17 + "px";
              } else if (navigator.platform.indexOf("Linux") > -1) {
                contentBody.style.height = (heightBody) + 15 + "px";
              } else {
                contentBody.style.height = (heightBody) + 15 + "px";
              }
            } else {
              contentBody.style.height = (heightBody) + "px";
            }
          }
        }
        this.log("AjustarPantalla().contentBody.style.width", contentBody.style.width);
        this.log("AjustarPantalla().idCont.style.width", content.style.width);
      } else {
        let contentHeader = <HTMLElement>document.querySelector('#vwHeader' + this.idGrid);
        contentHeader.style.width = "auto";
        let elements = document.querySelectorAll('.gridColumnas' + this.idGrid);
        let width: number = 0;
        for (var index = 0; index < elements.length; index++) {
          let _element = <HTMLElement>elements[index];
          var w = _element.offsetWidth;
          width += w;
        }
        contentHeader.style.width = (width) + "px";
      }
    } catch (e) {
      console.error("GridCopsisComponent.AjustarPantalla", e);
    }
  }

  onClickOptions(op: number, parameters: string, val?:string, idx?:number) {
    //console.log("onClickOptions click");
    //event.stopPropagation();
    event.preventDefault();
    this.btnOptionsGrid.emit({ "op": op, "parameters": parameters, "val": val, "idx":idx});
  }

  onClickBack(id, saltos) {
    var restados;
    restados = parseInt(id) - parseInt(saltos);
    if (restados < 0) {
      this.back = 0;
    } else {
      this.back = restados;
    }
    this.next = parseInt(id);
    this.btnBackGrid.emit([
      { "bk": this.back },
      { "nt": this.next },
      { "sr": this.buscar },
      { "nm": this.col_name },
      { "fn": this.fil_name },
      { "f": this.filtro }
    ]);
  }

  onClickNext(id, total, saltos) {
    this.back = parseInt(id);
    var sumados;
    sumados = parseInt(id) + parseInt(saltos);
    if (sumados > parseInt(total)) {
      this.next = parseInt(total);
    } else {
      this.next = sumados;
    }
    this.btnNextGrid.emit([
      { "bk": this.back },
      { "nt": this.next },
      { "sr": this.buscar },
      { "nm": this.col_name },
      { "fn": this.fil_name },
      { "f": this.filtro }
    ]);
  }

  onclickSearch(id: number, search: string, name: string) {
    this.inputSearch = search;
    this.myFocusTriggeringEventEmitter = true;
    this.isVisible = true;
    this.col_name = name;
    setTimeout(() => { this.myFocusTriggeringEventEmitter = false });
  }

  onclickLupa() {
    this.isVisible = true;
    this.myFocusTriggeringEventEmitter = true;
    setTimeout(() => { this.myFocusTriggeringEventEmitter = false });
  }

  onclickFiltro(name: string) {
    this.fil_name = name;
    switch (this.filtro) {
      case "":
        this.filtro = "desc"
        break;
      case "desc":
        this.filtro = "asc";
        break;
      case "asc":
        this.filtro = "desc";
        break;
    }
    this.btnSearchGrid.emit([
      { "bk": this.back },
      { "nt": this.next },
      { "sr": this.buscar },
      { "nm": this.col_name },
      { "fn": this.fil_name },
      { "f": this.filtro }
    ]);
  }

  onBlurSearch() {
    if (this.buscar == "") {
      // this.col_name = "";
      // this.isVisible = false;
      // this.back = 0;
      // this.next = 0;
      // this.btnSearchGrid.emit([{ "bk": 0 }, { "nt": 0 }, { "sr": this.buscar }, { "nm": this.col_name }, { "fn": this.fil_name }, { "f": this.filtro }]);
    }
  }

  search(e) {
    if (e.target.value == "") {
      // this.col_name = "";
      this.back = 0;
      this.next = 0;
      this.btnSearchGrid.emit([{ "bk": this.back }, { "nt": this.next }, { "sr": "" }, { "nm": "" }, { "fn": this.fil_name }, { "f": this.filtro }]);
    } else {
      var x1: string = "";
      var tecla = 0;
      x1 = e.target.value;
      x1 = x1.replace(" ", "%").replace(" ", "%").replace(" ", "%").replace(" ", "%");
      tecla = e.keyCode;
      if (tecla == 13) {
        if (x1 != "") {
          this.back = 0;
          this.next = 0;
          this.btnSearchGrid.emit([
            { "bk": this.back },
            { "nt": this.next },
            { "sr": this.buscar },
            { "nm": this.col_name },
            { "fn": this.fil_name },
            { "f": this.filtro }
          ]);
        }
      } else if (tecla == 48 || tecla == 49 || tecla == 50 || tecla == 51 || tecla == 52 || tecla == 53 || tecla == 54 || tecla == 55 || tecla == 56 || tecla == 57 || tecla == 96 || tecla == 97 || tecla == 98 || tecla == 99 || tecla == 100 || tecla == 101 || tecla == 102 || tecla == 103 || tecla == 104 || tecla == 105) {
        // Son números, no hacer nada
      } else {
        // Alguna letra                 
        if (tecla == 38 || tecla == 40) {
          return;
        }
      }
    }
  }

  onclickReset(): void {
    if(this.buscar == ""){
      this.col_name = "";
      this.isVisible = false;
      this.back = 0;
      this.next = 0;
      this.btnSearchGrid.emit([{ "bk": 0 }, { "nt": 0 }, { "sr": this.buscar }, { "nm": this.col_name }, { "fn": this.fil_name }, { "f": this.filtro }]);
    }else{
      this.buscar = "";
      this.back = 0;
      this.next = 0;
      this.btnSearchGrid.emit([{ "bk": 0 }, { "nt": 0 }, { "sr": this.buscar }, { "nm": this.col_name }, { "fn": this.fil_name }, { "f": this.filtro }]);
    }
  }

  onClickDownload(): void {
    this.btnDescargarGrid.emit([
      { "sr": this.buscar },
      { "nm": this.col_name },
      { "fn": this.fil_name },
      { "f": this.filtro }
    ]);
  }

  rowSelectedClick(param, index): void {
    if(param){
      this.rowSelectedItem = param;
      this.rowSelected.emit({ "id": param, "index": index });
    }
  }

  clearRowSelected() {
    this.rowSelectedItem = new EncryptConstants().ZERO;
  }

  clickSeguimiento(param, index): void {
    this.rowSelectedItem = param;
    this.seguimientoSelected.emit({ "id": param, "index": index });
  }

  clickRadioSelected(event){
    // console.log("entra");
    // console.log(event);
    this.radioSelected.emit({v1: event});
  }
  
  private log(evento: string, message?: any) {
    if (this.debug == true) {
      if (message) {
        console.log(evento, message);
      } else {
        console.log(evento);
      }
    }
  }

  verificarCambio(event, key){
    if(event.checked){      
      this.actionCheckbox.emit({"checked": true, "key": key});
    }else{
      this.actionCheckbox.emit({"checked": false, "key": key});
    }
  }

  rdReal(event){
    this.btnRdReal.emit(event);
  }

  ckReal(event){
    this.btnCkReal.emit(event);
  }
}
