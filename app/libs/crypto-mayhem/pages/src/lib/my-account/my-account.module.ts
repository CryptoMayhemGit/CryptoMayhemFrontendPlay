import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountComponent } from './my-account.component';
import { TranslocoModule } from '@ngneat/transloco';
import { InputModule } from '@crypto-mayhem-frontend/ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [MyAccountComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    InputModule,
    FontAwesomeModule
  ],
  exports: [MyAccountComponent],
})
export class MyAccountModule { }
