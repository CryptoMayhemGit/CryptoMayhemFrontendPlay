import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponentComponent } from './video-component.component';
import { MainButtonModule } from '../main-button/main-button.module';

@NgModule({
  declarations: [VideoComponentComponent],
  imports: [CommonModule, MainButtonModule],
  exports: [VideoComponentComponent],
})
export class VideoComponentModule {}
