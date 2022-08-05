import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { VideoComponentModule } from '../video-component/video-component.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, VideoComponentModule],
  exports: [MainPageComponent],
})
export class MainPageModule {}
