import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationHeaderModule } from './navigation-header/navigation-header.module';
import { MainButtonModule } from './main-button/main-button.module';
import { GameListingModule } from './game-listing/game-listing.module';
import { ModalBaseModule } from './modal-base/modal-base.module';
import { ModalDroneModule } from './modal-drone/modal-drone.module';
import { ProgressBarModule } from './progress-bar/progress-bar.module';
import { TimerModule } from './timer/timer.module';
import { VideoComponentModule } from './video-component/video-component.module';
import { InputModule } from './input/input.module';
import { PlayerDetailsModule } from './player-details/player-details.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { ModalAvatarChangeModule } from './modal-avatar-change/modal-avatar-change.module';
import { MyAccountMobileModule } from './my-account-mobile/my-account-mobile.module';
import { TokenBalanceModule } from './token-balance/token-balance.module';
import { HeaderFadedModule } from './header-faded/header-faded.module';
import { ItemListingModule } from './item-listing/item-listing.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TabNavigatorModule } from './tab-navigator/tab-navigator.module';

@NgModule({
  imports: [CommonModule],
  exports: [
    NavigationHeaderModule,
    MainButtonModule,
    GameListingModule,
    ModalBaseModule,
    ModalDroneModule,
    ProgressBarModule,
    TimerModule,
    VideoComponentModule,
    InputModule,
    PlayerDetailsModule,
    TooltipModule,
    InputModule,
    ModalAvatarChangeModule,
    MyAccountMobileModule,
    TokenBalanceModule,
    HeaderFadedModule,
    ItemListingModule,
    NotificationsModule,
    TabNavigatorModule
  ],
})
export class UiModule {}
