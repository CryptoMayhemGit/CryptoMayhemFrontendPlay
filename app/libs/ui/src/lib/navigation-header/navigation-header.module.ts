import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationHeaderComponent } from './navigation-header.component';
import { TranslocoModule } from '@ngneat/transloco';
import { MainButtonModule } from '../main-button/main-button.module';
import { LangSwitchModule } from '../lang-switch/lang-switch.module';

@NgModule({
  declarations: [NavigationHeaderComponent],
  imports: [CommonModule, TranslocoModule, MainButtonModule, LangSwitchModule],
  exports: [NavigationHeaderComponent],
})
export class NavigationHeaderModule {}
