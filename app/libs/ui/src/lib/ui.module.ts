import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModule } from './notification/notification.module';
import { NavigationHeaderModule } from './navigation-header/navigation-header.module';
import { MainButtonModule } from './main-button/main-button.module';
import { GameListingModule } from './game-listing/game-listing.module';
import { ModalBaseModule } from './modal-base/modal-base.module';
import { ModalDroneModule } from './modal-drone/modal-drone.module';
import { ProgressBarModule } from './progress-bar/progress-bar.module';
import { TimerModule } from './timer/timer.module';
import { VideoComponentModule } from './video-component/video-component.module';
import { InputComponent } from './input/input.component';
import { InputModule } from './input/input.module';

@NgModule({
  imports: [CommonModule],
  exports: [
    NotificationModule,
    NavigationHeaderModule,
    MainButtonModule,
    GameListingModule,
    ModalBaseModule,
    ModalDroneModule,
    ProgressBarModule,
    TimerModule,
    VideoComponentModule,
    InputModule
  ],
})
export class UiModule {}
