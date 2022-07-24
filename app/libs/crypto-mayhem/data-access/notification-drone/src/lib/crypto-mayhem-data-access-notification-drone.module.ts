import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import * as fromNotificationService from './state/notification-drone.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromNotificationService.notificationDroneKey,
      fromNotificationService.reducer
    )
  ],
})
export class CryptoMayhemDataAccessNotificationDroneModule {}
