import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { TopDownShooterComponent } from './top-down-shooter.component';
import { HeaderFadedModule, ItemListingModule, MainButtonModule, TimerModule, TooltipModule } from '@crypto-mayhem-frontend/ui';


@NgModule({
  declarations: [TopDownShooterComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    HeaderFadedModule,
    ItemListingModule,
    MainButtonModule,
    TimerModule,
    TooltipModule
  ],
  exports: [TopDownShooterComponent]
})
export class TopDownShooterModule { }
