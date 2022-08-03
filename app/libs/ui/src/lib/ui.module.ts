import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModule } from './notification/notification.module';
import { NavigationHeaderModule } from './navigation-header/navigation-header.module';
import { LandingPageModule } from './landing-page/landing-page.module';
import { MainButtonModule } from './main-button/main-button.module';
import { GameListingModule } from './game-listing/game-listing.module';
import { ModalBaseModule } from './modal-base/modal-base.module';
import { ModalDroneModule } from './modal-drone/modal-drone.module';
import { ProgressBarModule } from './progress-bar/progress-bar.module';
import { TimerModule } from './timer/timer.module';
import { GrandStrategyModule } from './grand-strategy/grand-strategy.module';
import { GrandStrategyComponent } from './grand-strategy/grand-strategy.component';

@NgModule({
  imports: [CommonModule],
  exports: [
    NotificationModule,
    LandingPageModule,
    NavigationHeaderModule,
    MainButtonModule,
    GameListingModule,
    ModalBaseModule,
    ModalDroneModule,
    ProgressBarModule,
    TimerModule,
    GrandStrategyModule,
  ],
  declarations: [GrandStrategyComponent],
})
export class UiModule {}
