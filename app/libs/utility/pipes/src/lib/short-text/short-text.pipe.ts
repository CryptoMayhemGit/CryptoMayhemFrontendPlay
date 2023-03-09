import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortText'
})
export class ShortTextPipe implements PipeTransform {

  transform(value: string | null, amount: number): string {
    if (value)
        return value.length > amount ? value?.substring(0, amount).concat('...') : value;
    return '';
}

}
