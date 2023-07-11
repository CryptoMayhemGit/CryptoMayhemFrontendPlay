import { NgModule } from '@angular/core';
import { StakingComponent } from './staking.component';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { MainButtonModule } from '../main-button/main-button.module';
import { HeaderFadedModule } from '../header-faded/header-faded.module';
import { TimerModule } from '../timer/timer.module';

@NgModule({
    declarations: [StakingComponent],
    imports: [
        CommonModule,
        TranslocoModule,
        MainButtonModule,
        HeaderFadedModule,
        TimerModule
    ],
    exports: [StakingComponent]
})
export class StakingModule {}