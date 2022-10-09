import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
  name: 'adriaToken',
})
export class AdriaTokenPipe implements PipeTransform {
  transloco: TranslocoService;

  constructor(translocoService: TranslocoService) {
    this.transloco = translocoService;
  }

  transform(amount: number): string {
    return amount >= 1000000
      ? `${amount / 1000000}${this.transloco.translate('MILLION_ABBREVIATION')}`
      : `${amount}`;
  }
}
