import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sort"
})
export class ArraySortPipe  implements PipeTransform {
  transform(array: any, field: string): any[] {
    const arraySort = [...array];
    if (!Array.isArray(array)) {
      return [];
    }
    arraySort.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return arraySort;
  }
}