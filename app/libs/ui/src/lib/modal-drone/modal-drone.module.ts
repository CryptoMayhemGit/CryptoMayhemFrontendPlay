import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDroneComponent } from './modal-drone.component';
import { ModalBaseModule } from '../modal-base/modal-base.module';
import { MainButtonModule } from '../main-button/main-button.module';

@NgModule({
  declarations: [ModalDroneComponent],
  imports: [CommonModule, ModalBaseModule, MainButtonModule],
  exports: [ModalDroneComponent],
})
export class ModalDroneModule {}
