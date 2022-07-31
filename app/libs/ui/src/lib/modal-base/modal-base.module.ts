import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalBaseComponent } from './modal-base.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ModalBaseComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [ModalBaseComponent],
})
export class ModalBaseModule {}
