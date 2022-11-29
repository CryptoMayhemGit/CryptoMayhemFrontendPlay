import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAvatarChangeComponent } from './modal-avatar-change.component';
import { ModalBaseModule } from '../modal-base/modal-base.module';
import { InputModule } from '../input/input.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';



@NgModule({
  declarations: [ModalAvatarChangeComponent],
  imports: [
    CommonModule,
    ModalBaseModule,
    InputModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  exports: [ModalAvatarChangeComponent]
})
export class ModalAvatarChangeModule { }
