import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LatestNewsComponent } from './latest-news.component';
import { PipesModule } from '@crypto-mayhem-frontend/utility/pipes';
import { TranslocoModule } from '@ngneat/transloco';



@NgModule({
  declarations: [LatestNewsComponent],
  imports: [
    CommonModule,
    PipesModule,
    TranslocoModule
  ],
  exports: [LatestNewsComponent]
})
export class LatestNewsModule { }
