import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LauncherComponent } from './launcher.component';



@NgModule({
  declarations: [
    LauncherComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LauncherComponent
  ]
})
export class LauncherModule { }
