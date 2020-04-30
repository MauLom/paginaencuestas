import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { BuscadorCotizadorComponent } from './buscador-cotizador/buscador-cotizador.component';
import { BuscadorCopsisComponent } from './buscador-sio/buscador-copsis.component';

// components

export const ROOT_TOOLS: any[] = [
    BuscadorCotizadorComponent,
    BuscadorCopsisComponent
];

@NgModule({
    declarations: [ROOT_TOOLS],
    imports: [        
        FormsModule,
        AngularMaterialModule        
    ],
    exports: [ROOT_TOOLS],
    providers: []
})
export class BuscadorModule {}