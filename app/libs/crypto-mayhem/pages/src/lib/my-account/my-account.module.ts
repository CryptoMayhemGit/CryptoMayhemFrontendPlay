import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountComponent } from './my-account.component';
import { TranslocoModule } from '@ngneat/transloco';
import { InputModule, MainButtonModule, ModalAvatarChangeModule, PlayerDetailsModule, TooltipModule } from '@crypto-mayhem-frontend/ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MyAccountComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    InputModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    PlayerDetailsModule,
    TooltipModule,
    MainButtonModule,
    ModalAvatarChangeModule
  ],
  exports: [MyAccountComponent],
})
export class MyAccountModule { }
