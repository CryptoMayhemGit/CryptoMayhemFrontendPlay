import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainButtonComponent } from './main-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [MainButtonComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [MainButtonComponent],
})
export class MainButtonModule {}
