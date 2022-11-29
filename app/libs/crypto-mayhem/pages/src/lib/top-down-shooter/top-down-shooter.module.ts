import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { TopDownShooterComponent } from './top-down-shooter.component';
import { HeaderFadedModule, ItemListingModule, MainButtonModule, TimerModule } from '@crypto-mayhem-frontend/ui';


@NgModule({
  declarations: [TopDownShooterComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    HeaderFadedModule,
    ItemListingModule,
    MainButtonModule,
    TimerModule
  ],
  exports: [TopDownShooterComponent]
})
export class TopDownShooterModule { }
