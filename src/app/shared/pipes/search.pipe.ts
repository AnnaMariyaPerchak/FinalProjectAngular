import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(numbers: Array<any>, searchName: string): unknown {
    if (!searchName) {
      return numbers;
    }
    if (!numbers) {
      return [];
    }
    return numbers.filter(category => category.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1);
  }

}
