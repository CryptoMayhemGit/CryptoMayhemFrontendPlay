import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameListingComponent } from './game-listing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [GameListingComponent],
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [GameListingComponent],
})
export class GameListingModule {}
