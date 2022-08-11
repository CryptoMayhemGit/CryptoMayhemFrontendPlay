import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { VideoComponentModule } from '../video-component/video-component.module';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, VideoComponentModule, TranslocoModule],
  exports: [MainPageComponent],
})
export class MainPageModule {}
