import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputWithValidationComponent } from './input-with-validation/input-with-validation.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InputWithValidationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    InputWithValidationComponent
  ]
})
export class SharedModule { }
