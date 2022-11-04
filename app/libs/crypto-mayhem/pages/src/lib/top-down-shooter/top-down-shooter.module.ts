import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { TopDownShooterComponent } from './top-down-shooter.component';
import { HeaderFadedModule, ItemListingModule, MainButtonModule } from '@crypto-mayhem-frontend/ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [TopDownShooterComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    HeaderFadedModule,
    ItemListingModule,
    MainButtonModule
  ],
  exports: [TopDownShooterComponent]
})
export class TopDownShooterModule { }
