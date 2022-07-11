import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangSwitchComponent } from './lang-switch.component';
import { TranslocoModule } from '@ngneat/transloco';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [LangSwitchComponent],
  imports: [CommonModule, TranslocoModule, BrowserAnimationsModule],
  exports: [LangSwitchComponent],
})
export class LangSwitchModule {}
