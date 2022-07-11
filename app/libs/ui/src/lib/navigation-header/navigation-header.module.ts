import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationHeaderComponent } from './navigation-header.component';
import { TranslocoModule } from '@ngneat/transloco';
import { MainButtonModule } from '../main-button/main-button.module';
import { LangSwitchModule } from '../lang-switch/lang-switch.module';
import { SubmenuModule } from '../submenu/submenu.module';
import { GameListingModule } from '../game-listing/game-listing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [NavigationHeaderComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    MainButtonModule,
    LangSwitchModule,
    SubmenuModule,
    GameListingModule,
    BrowserAnimationsModule,
  ],
  exports: [NavigationHeaderComponent],
})
export class NavigationHeaderModule {}
