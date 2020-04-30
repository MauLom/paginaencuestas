import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GridCopsisComponent } from './grid-copsis/grid-copsis.component';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { PipeModule } from '../pipe/pipe.module';
import { DirectiveModule } from '../directive/directive.module';
// components

export const ROOT_TOOLS: any[] = [
    GridCopsisComponent
];

@NgModule({
    declarations: [ROOT_TOOLS],
    imports: [        
        FormsModule,
        AngularMaterialModule,
        PipeModule,
        DirectiveModule
    ],
    exports: [ROOT_TOOLS],
    providers: []
})
export class GridModule {}