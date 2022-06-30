import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangSwitchComponent } from './lang-switch.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [LangSwitchComponent],
  imports: [CommonModule, TranslocoModule],
  exports: [LangSwitchComponent],
})
export class LangSwitchModule {}
