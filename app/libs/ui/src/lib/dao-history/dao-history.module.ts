import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaoHistoryComponent } from './dao-history.component';
import { RadioButtonModule } from '../radio-button/radio-button.module';
import { VotingResultItemModule } from '../voting-result-item/voting-result-item.module';
import { TranslocoModule } from '@ngneat/transloco';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [DaoHistoryComponent],
  imports: [CommonModule, RadioButtonModule, VotingResultItemModule, TranslocoModule, InfiniteScrollModule],
  exports: [DaoHistoryComponent],
})
export class DaoHistoryModule {}
