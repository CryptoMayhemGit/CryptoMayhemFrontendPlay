import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerDetailsComponent } from './player-details.component';
import { InputModule } from '../input/input.module';
import { MainButtonModule } from '../main-button/main-button.module';
import { TranslocoModule } from '@ngneat/transloco';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from '../tooltip/tooltip.module';


@NgModule({
  declarations: [PlayerDetailsComponent],
  imports: [
    CommonModule,
    InputModule,
    MainButtonModule,
    TranslocoModule,
    ReactiveFormsModule,
    TooltipModule
  ],
  exports: [PlayerDetailsComponent]
})
export class PlayerDetailsModule { }
