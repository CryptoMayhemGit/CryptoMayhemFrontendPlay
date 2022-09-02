import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountComponent } from './my-account.component';
import { TranslocoModule } from '@ngneat/transloco';


@NgModule({
  declarations: [MyAccountComponent],
  imports: [
    CommonModule,
    TranslocoModule
  ],
  exports: [MyAccountComponent],
})
export class MyAccountModule { }
