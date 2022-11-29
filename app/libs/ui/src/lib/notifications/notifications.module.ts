import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalBaseModule } from '../modal-base/modal-base.module';
import { MainButtonModule } from '../main-button/main-button.module';
import { CryptoMayhemDataAccessNotificationDroneModule } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/notification-drone';
import { TranslocoModule } from '@ngneat/transloco';
import { NotificationsComponent } from './notifications.component';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    CommonModule,
    ModalBaseModule,
    MainButtonModule,
    CryptoMayhemDataAccessNotificationDroneModule,
    TranslocoModule,
  ],
  exports: [NotificationsComponent],
})
export class NotificationsModule {}
