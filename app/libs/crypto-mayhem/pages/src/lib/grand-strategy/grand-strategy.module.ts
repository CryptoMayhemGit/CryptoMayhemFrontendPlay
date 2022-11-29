import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrandStrategyComponent } from './grand-strategy.component';
import { ProgressBarModule } from '@crypto-mayhem-frontend/ui';

@NgModule({
  declarations: [GrandStrategyComponent],
  imports: [CommonModule, ProgressBarModule],
  exports: [GrandStrategyComponent],
})
export class GrandStrategyModule {}
