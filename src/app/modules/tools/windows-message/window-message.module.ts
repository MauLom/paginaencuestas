import { NgModule } from '@angular/core';

import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { SimpleMessageComponent } from './simple-message/simple-message.component';
import { AlertMessageComponent } from './alert-message/alert-simple.component';
// components

export const ROOT_TOOLS: any[] = [
    SimpleMessageComponent,
    AlertMessageComponent
];

@NgModule({
    declarations: [ROOT_TOOLS],
    imports: [
        AngularMaterialModule
    ],
    exports: [ROOT_TOOLS],
    providers: [
        SimpleMessageComponent,
        AlertMessageComponent
    ],
    entryComponents: [
        SimpleMessageComponent
    ]
})
export class WindowMessageModule {}