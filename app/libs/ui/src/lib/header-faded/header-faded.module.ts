import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderFadedComponent } from './header-faded.component';



@NgModule({
  declarations: [HeaderFadedComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderFadedComponent]
})
export class HeaderFadedModule { }
