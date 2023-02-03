import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotingResultItemComponent } from './voting-result-item.component';
import { OrderHighlightModule } from '../order-highlight/order-highlight.module';
import { ProgressBarModule } from '../progress-bar/progress-bar.module';
import { TranslocoModule } from '@ngneat/transloco';
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
  declarations: [VotingResultItemComponent],
  imports: [CommonModule, OrderHighlightModule, ProgressBarModule, TranslocoModule, TooltipModule],
  exports: [VotingResultItemComponent],
})
export class VotingResultItemModule {}
