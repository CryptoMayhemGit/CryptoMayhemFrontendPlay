import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import * as fromNotificationService from './state/notification-drone.reducer';
import { NotificationsService } from './services/notification-drone.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromNotificationService.notificationDroneKey,
      fromNotificationService.reducer
    )
  ],
  providers: [ NotificationsService ]
})
export class CryptoMayhemDataAccessNotificationDroneModule {}
