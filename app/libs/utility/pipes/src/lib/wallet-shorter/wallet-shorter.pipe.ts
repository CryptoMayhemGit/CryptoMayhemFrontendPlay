import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'walletShorter',
  })
  export class WalletShorterPipe implements PipeTransform {
    transform(value: string | null): string {
        if (value)
            return value?.substring(0, 4).concat('...', value.slice(-4));
        return '';
    }

}