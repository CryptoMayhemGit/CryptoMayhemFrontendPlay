import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [InputComponent]
})
export class InputModule { }
