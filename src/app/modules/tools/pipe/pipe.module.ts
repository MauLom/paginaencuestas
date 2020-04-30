import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KeysPipe } from './keys-pipe/keys-pipe.pipe';
import { KeysPipeFormaPago } from './keys-pipe/keys-pipe-formas-pago.pipe';
// components

export const ROOT_TOOLS: any[] = [
    KeysPipe,
    KeysPipeFormaPago
];

@NgModule({
    declarations: [ROOT_TOOLS],
    imports: [        
        FormsModule
    ],
    exports: [ROOT_TOOLS],
    providers: []
})
export class PipeModule {}