import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaoHistoryComponent } from './dao-history.component';
import { RadioButtonModule } from '../radio-button/radio-button.module';
import { VotingResultItemModule } from '../voting-result-item/voting-result-item.module';
import { TranslocoModule } from '@ngneat/transloco';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PipesModule } from '@crypto-mayhem-frontend/utility/pipes';


@NgModule({
  declarations: [DaoHistoryComponent],
  imports: [
    CommonModule,
    RadioButtonModule,
    VotingResultItemModule,
    TranslocoModule,
    InfiniteScrollModule,
    PipesModule
  ],
  exports: [DaoHistoryComponent],
})
export class DaoHistoryModule {}
