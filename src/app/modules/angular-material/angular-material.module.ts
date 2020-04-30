import { NgModule } from '@angular/core';
import { 
    MatInputModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatSnackBarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCheckboxModule, 
    MatDialogModule, 
    MatMenuModule, 
    MatExpansionModule, 
    MatRadioModule,
    MatListModule,
    MatDividerModule,
    MatDatepickerModule,
    MatToolbarModule,
    DateAdapter,
    MAT_DATE_FORMATS,
    MatSlideToggleModule
} from "@angular/material";
import { CommonModule } from "@angular/common";
import { MatTabsModule } from '@angular/material/tabs';
import { MyDateAdapter } from './date-adapter/MyDateAdapter';

import {FormControl, Validators} from '@angular/forms';

import {FormBuilder, FormGroup,} from '@angular/forms';

export const APP_DATE_FORMATS = {
    parse: {
        dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { month: 'short', year: 'numeric', day: 'numeric' },
        dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
        monthYearA11yLabel: {year: 'numeric', month: 'long'},
    }
 }

export const COMPONENTS: any[] = [
    MatInputModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatSnackBarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCheckboxModule, 
    MatDialogModule, 
    MatMenuModule, 
    MatExpansionModule, 
    MatRadioModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
    CommonModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatExpansionModule
];

@NgModule({
    declarations: [],    
    imports: [                          
        COMPONENTS    
    ],
    exports: [        
        COMPONENTS 
    ],
    providers: [
        { provide: DateAdapter, useClass: MyDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
    ]
})
export class AngularMaterialModule {}

export class FormFieldErrorExample {
    email = new FormControl('', [Validators.required, Validators.email]);
  
    getErrorMessage() {
      return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :'';
    }
  }

  export class FormFieldThemingExample {
    options: FormGroup;
  
    constructor(fb: FormBuilder) {
      this.options = fb.group({
        color: 'primary',
        fontSize: [16, Validators.min(10)],
      });
    }
  
    getFontSize() {
      return Math.max(10, this.options.value.fontSize);
    }
  }