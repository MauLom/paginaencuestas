import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFocusComponent } from './input-focus/input-focus.directive';
import { SioLoaderDirective } from './loader/loader.directive';
import { ValidationPorcentaje } from './porcentaje-validation.component';
import { SioDragDropDirective } from './drag-n-drop.directive';
import { ReSize } from './re-size.directive';
import { ReSizeDirective } from './resize-sio.directive';
// components

export const ROOT_TOOLS: any[] = [
    InputFocusComponent,
    SioLoaderDirective,
    ValidationPorcentaje,
    SioDragDropDirective,
    ReSize,
    ReSizeDirective
];

@NgModule({
    declarations: [ROOT_TOOLS],
    imports: [        
        FormsModule
    ],
    exports: [ROOT_TOOLS],
    providers: []
})
export class DirectiveModule {}