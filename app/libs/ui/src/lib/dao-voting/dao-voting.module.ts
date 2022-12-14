import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaoVotingComponent } from './dao-voting.component';
import { HeaderGradientModule } from '../../header-gradient/header-gradient.module';

@NgModule({
  declarations: [DaoVotingComponent],
  imports: [CommonModule, HeaderGradientModule],
  exports: [DaoVotingComponent],
})
export class DaoVotingModule {}
