import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponentComponent } from './video-component.component';
import { MainButtonModule } from '../main-button/main-button.module';
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
  declarations: [VideoComponentComponent],
  imports: [CommonModule, MainButtonModule, TooltipModule],
  exports: [VideoComponentComponent],
})
export class VideoComponentModule {}
