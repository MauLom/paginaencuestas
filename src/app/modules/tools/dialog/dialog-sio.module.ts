import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogSioComponent } from '../dialog/dialog-sio/dialog-sio.component';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { SafePipeModule } from "safe-pipe";

export const ROOT_TOOLS: any[] = [
    DialogSioComponent
];

@NgModule({
    declarations:[ROOT_TOOLS],
    imports: [        
        FormsModule,
        AngularMaterialModule,
        SafePipeModule
    ],
    exports: [ROOT_TOOLS],
    providers: []
})

export class DialogSioModule{}