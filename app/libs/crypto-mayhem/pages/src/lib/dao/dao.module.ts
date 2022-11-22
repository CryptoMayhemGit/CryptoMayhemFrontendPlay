import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaoComponent } from './dao.component';
import { HeaderFadedModule } from '@crypto-mayhem-frontend/ui';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [DaoComponent],
  imports: [CommonModule, HeaderFadedModule, TranslocoModule],
  exports: [DaoComponent],
})
export class DaoModule {}
