import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number | null): string {
    console.log('value', value);
    if (value === null) return '';

    return `${this.getDays(value)} D | ${this.getHours(
      value
    )} H | ${this.getMinutes(value)} M | ${this.getSeconds(value)} S`;
  }

  getSeconds(miliseconds: number) {
    return Math.floor((miliseconds / 1000) % 60);
  }

  getMinutes(miliseconds: number) {
    return Math.floor((miliseconds / 1000 / 60) % 60);
  }

  getHours(miliseconds: number) {
    return Math.floor((miliseconds / 1000 / 60 / 60) % 24);
  }

  getDays(miliseconds: number) {
    return Math.floor(miliseconds / 1000 / 60 / 60 / 24);
  }
}
