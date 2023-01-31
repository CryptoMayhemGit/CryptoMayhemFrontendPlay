import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaoVotingComponent } from './dao-voting.component';
import { HeaderGradientModule } from '../header-gradient/header-gradient.module';
import { TimerModule } from '../timer/timer.module';
import { VotingResultItemModule } from '../voting-result-item/voting-result-item.module';
import { RadioButtonModule } from '../radio-button/radio-button.module';
import { TranslocoModule } from '@ngneat/transloco';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainButtonModule } from '../main-button/main-button.module';
import { OrderHighlightModule } from '../order-highlight/order-highlight.module';
import { AdriaTokenModule } from '../adria-token/adria-token.module';
import { TabNavigatorModule } from '../tab-navigator/tab-navigator.module';
import { PipesModule } from '@crypto-mayhem-frontend/utility/pipes';
import { DaoVotingDetailModule } from '../dao-voting-detail/dao-voting-detail.module';

@NgModule({
  declarations: [DaoVotingComponent],
  imports: [
    CommonModule,
    HeaderGradientModule,
    TimerModule,
    RadioButtonModule,
    VotingResultItemModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    MainButtonModule,
    OrderHighlightModule,
    AdriaTokenModule,
    TabNavigatorModule,
    PipesModule,
    DaoVotingDetailModule
  ],
  exports: [DaoVotingComponent],
})
export class DaoVotingModule {}
