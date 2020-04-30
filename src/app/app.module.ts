import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';

import { WindowMessageModule } from './modules/tools/windows-message/window-message.module';

// modulos
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { PostMessageModule } from 'ngx-post-message';
import { DirectiveModule } from "./modules/tools/directive/directive.module"
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// services
import { AppService } from './services/app-service';
import { RequestService } from './services/request.service';


// routing
import { routing } from './app.routing';
import { DataService } from './services/compose/data-compose';


//componentes

import { CarpoolComponent } from './modules/carpool/components/carpool.component';



@NgModule({
  declarations: [
    AppComponent,

    
  ],
  imports: [
    BrowserModule,       
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    HttpModule, 
    HttpClientModule,
    AngularMaterialModule,
    routing,
    PostMessageModule,
    DirectiveModule,
    WindowMessageModule
  ],
  providers: [
    AppService, 
    DataService,
    RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
