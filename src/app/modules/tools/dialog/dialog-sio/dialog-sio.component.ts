import { Component, OnInit, ViewChild, ElementRef, HostListener } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { SioDialogConfig, KeyCodeRandom } from "./dialog-sio-config";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'dialog-sio',
  templateUrl: './dialog-sio.component.html',
  styleUrls: ['./dialog-sio.component.css'],
  inputs: ["url", "width", "height", "title", "dialogTitle", "dialogAction", "id", "closeRight"]
})
export class DialogSioComponent implements OnInit {
  @ViewChild('iframesio') iframe: ElementRef;
  public id: string = "";
  private dialogSubject = new Subject();
  public debug: boolean = false;
  public url: string = "";
  public width: string = "auto";
  public height: string = "auto";
  public title: string = "";
  public dialogTitle: boolean = true;
  public dialogAction: boolean = true;
  public titleAbsolute: boolean = false;
  private keyCode: string = "";
  public closeRight: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:message', ['$event'])
  onMessage(event) {
    if (event.data && this.url != "") {
      if (event.data.key == this.keyCode) {
        this.log("event.data", event.data);
        this.closeDialog();
        this.dialogSubject.next(event.data);
      }
    }
  }

  public showDialig(url: string, sioDialogConfig: SioDialogConfig): DialogSioComponent {
    this.dialogSubject = new Subject();
    this.keyCode = new KeyCodeRandom().getKeyCode(20);
    this.url = url + "&fo=" + window.location.origin + "&kc=" + this.keyCode + "&lsb=" + localStorage.getItem("b");
    if (sioDialogConfig.width != undefined) { this.width = sioDialogConfig.width; }
    if (sioDialogConfig.height != undefined) { this.height = sioDialogConfig.height; }
    if (sioDialogConfig.title != undefined) { this.title = sioDialogConfig.title; }
    if (sioDialogConfig.dialogTitle != undefined) { this.dialogTitle = sioDialogConfig.dialogTitle; }
    if (sioDialogConfig.dialogAction != undefined) { this.dialogAction = sioDialogConfig.dialogAction; }
    if (sioDialogConfig.titleAbsolute != undefined) { this.titleAbsolute = sioDialogConfig.titleAbsolute; } else { this.titleAbsolute = false; }
    if (sioDialogConfig.closeRight != undefined) { this.closeRight = sioDialogConfig.closeRight; }
    return this;
  }

  public closeDialog() {
    this.url = "";
    this.width = "auto";
    this.height = "auto";
    this.title = "";
    this.dialogTitle = true;
    this.dialogAction = true;
    this.titleAbsolute = false;
    this.closeRight = false;
  }

  public setTitle(title: string) {
    this.title = title;
  }
  public setWidth(width: string) {
    this.width = width;
  }

  public setHeight(height: string) {
    this.height = height;
  }

  public setDialogTitle(dialogTitle: boolean) {
    this.dialogTitle = dialogTitle;
  }

  public setDialogAction(dialogAction: boolean) {
    this.dialogAction = dialogAction;
  }

  public setTitleAbsolute(titleAbsolute: boolean) {
    this.titleAbsolute = titleAbsolute;
  }

  public afterClose(): Observable<any> {
    return this.dialogSubject.asObservable();
  }

  public setCloseRight(closeRight:boolean){
    this.closeRight = closeRight;
  }

  private log(evento: string, message: any) {
    if (this.debug == true) {
      console.log(evento, message);
    }
  }
}
