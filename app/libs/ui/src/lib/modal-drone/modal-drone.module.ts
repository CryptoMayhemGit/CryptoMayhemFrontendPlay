import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDroneComponent } from './modal-drone.component';
import { ModalBaseModule } from '../modal-base/modal-base.module';
import { MainButtonModule } from '../main-button/main-button.module';
import { CryptoMayhemDataAccessNotificationDroneModule } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/notification-drone';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [ModalDroneComponent],
  imports: [
    CommonModule,
    ModalBaseModule,
    MainButtonModule,
    CryptoMayhemDataAccessNotificationDroneModule,
    TranslocoModule,
  ],
  exports: [ModalDroneComponent],
})
export class ModalDroneModule {}
