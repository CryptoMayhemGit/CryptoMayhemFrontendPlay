import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModule } from './notification/notification.module';
import { NavbarModule } from './navbar/navbar.module';
import { LandingPageModule } from './landing-page/landing-page.module';

@NgModule({
  imports: [CommonModule],
  exports: [NotificationModule, NavbarModule, LandingPageModule]
})
export class UiModule {}
