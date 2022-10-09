import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bnbToken',
})
export class BnbTokenPipe implements PipeTransform {
  transform(value: number | null): string {
    if (value === null) {
      return '';
    }

    let amount = value.toString();
    return amount.length > 7 ? amount.substring(0, 7) : amount;
  }
}
