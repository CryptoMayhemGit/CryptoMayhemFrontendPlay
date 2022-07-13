import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModule } from './notification/notification.module';
import { NavbarModule } from './navbar/navbar.module';
import { NavigationHeaderModule } from './navigation-header/navigation-header.module';
import { LandingPageModule } from './landing-page/landing-page.module';
import { MainButtonModule } from './main-button/main-button.module';
import { GameListingModule } from './game-listing/game-listing.module';

@NgModule({
  imports: [CommonModule],
  exports: [
    NotificationModule,
    NavbarModule,
    LandingPageModule,
    NavigationHeaderModule,
    MainButtonModule,
    GameListingModule,
  ],
})
export class UiModule {}
