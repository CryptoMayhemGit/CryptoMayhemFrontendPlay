import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatTimePipe } from './format-time/format-time.pipe';
import { WalletShorterPipe } from './wallet-shorter/wallet-shorter.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [FormatTimePipe, WalletShorterPipe],
  exports: [FormatTimePipe, WalletShorterPipe],
})
export class PipesModule {}
