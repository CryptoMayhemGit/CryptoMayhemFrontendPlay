import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer.component';
import { PipesModule } from '@crypto-mayhem-frontend/utility/pipes';

@NgModule({
  declarations: [TimerComponent],
  imports: [CommonModule, PipesModule],
  exports: [TimerComponent],
})
export class TimerModule {}
