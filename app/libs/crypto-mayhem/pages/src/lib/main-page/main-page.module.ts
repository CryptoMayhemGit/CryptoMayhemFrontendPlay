import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { TranslocoModule } from '@ngneat/transloco';
import { VideoComponentModule } from '@crypto-mayhem-frontend/ui';

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, VideoComponentModule, TranslocoModule],
  exports: [MainPageComponent],
})
export class MainPageModule {}
