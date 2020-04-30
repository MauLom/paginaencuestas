import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';


//Modulos
import { AngularMaterialModule } from '../angular-material/angular-material.module';


//routing
import { routing } from './carpool.routing'

//Tools
import { GridModule } from '../tools/grid/grid.module';
import { PipeModule } from '../tools/pipe/pipe.module';
import { DirectiveModule } from '../tools/directive/directive.module';

//Components
import { CarpoolComponent } from './components/carpool.component';
import { AutonuevoComponent } from './components/autonuevo/autonuevo.component'




@NgModule ({
    declarations: [
        CarpoolComponent,
        AutonuevoComponent, 
    ],
    imports:  [
        FormsModule,
        CommonModule,
        HttpModule, 
        AngularMaterialModule,
        GridModule,
        PipeModule,
        DirectiveModule,
        routing,

    ],
    entryComponents: [
        AutonuevoComponent,
    ],
    exports: [],
    providers: []
})
export class CarpoolModule {}