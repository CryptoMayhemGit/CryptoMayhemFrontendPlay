import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationHeaderComponent } from './navigation-header.component';
import { TranslocoModule } from '@ngneat/transloco';
import { MainButtonModule } from '../main-button/main-button.module';

@NgModule({
  declarations: [NavigationHeaderComponent],
  imports: [CommonModule, TranslocoModule, MainButtonModule],
  exports: [NavigationHeaderComponent],
})
export class NavigationHeaderModule {}
