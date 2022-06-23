import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationHeaderComponent } from './navigation-header.component';
import { TranslocoModule } from '@ngneat/transloco';



@NgModule({
  declarations: [NavigationHeaderComponent],
  imports: [
    CommonModule,
    TranslocoModule
  ],
  exports: [NavigationHeaderComponent]
})
export class NavigationHeaderModule { }
