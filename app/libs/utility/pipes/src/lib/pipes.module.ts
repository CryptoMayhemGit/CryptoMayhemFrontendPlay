import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatTimePipe } from './format-time/format-time.pipe';
import { WalletShorterPipe } from './wallet-shorter/wallet-shorter.pipe';
import { AdriaTokenPipe } from './adria-token/adria-token.pipe';
import { TranslocoModule } from '@ngneat/transloco';
import { BnbTokenPipe } from './bnb-token/bnb-token.pipe';
import { ArraySortPipe } from './arraySort/array-sort.pipe';
import { ShortTextPipe } from './short-text/short-text.pipe';

@NgModule({
  imports: [CommonModule, TranslocoModule],
  declarations: [
    FormatTimePipe,
    AdriaTokenPipe,
    WalletShorterPipe,
    BnbTokenPipe,
    ArraySortPipe,
    ShortTextPipe
  ],
  exports: [
    FormatTimePipe,
    AdriaTokenPipe,
    WalletShorterPipe,
    BnbTokenPipe,
    ArraySortPipe,
    ShortTextPipe
  ],
})
export class PipesModule {}
