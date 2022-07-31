import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { LandingPageComponent } from './landing-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [CommonModule, TranslocoModule, RouterModule],
  exports: [LandingPageComponent],
})
export class LandingPageModule {}
