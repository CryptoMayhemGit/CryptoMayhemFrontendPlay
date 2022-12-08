import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabNavigatorComponent } from './tab-navigator.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [TabNavigatorComponent],
  imports: [CommonModule, TranslocoModule],
  exports: [TabNavigatorComponent],
})
export class TabNavigatorModule {}
