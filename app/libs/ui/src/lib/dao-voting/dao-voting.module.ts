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
    MainButtonModule
  ],
  exports: [DaoVotingComponent],
})
export class DaoVotingModule {}
