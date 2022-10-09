import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatTimePipe } from './format-time/format-time.pipe';
import { WalletShorterPipe } from './wallet-shorter/wallet-shorter.pipe';
import { FormatAdriaTokenPipe } from './format-adria-token/format-adria-token.pipe';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  imports: [CommonModule, TranslocoModule],
  declarations: [FormatTimePipe, FormatAdriaTokenPipe, WalletShorterPipe],
  exports: [FormatTimePipe, FormatAdriaTokenPipe, WalletShorterPipe],
})
export class PipesModule {}
