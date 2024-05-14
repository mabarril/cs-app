import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: 'sortByName',
  standalone: true
})
export class SortByNamePipe implements PipeTransform {

  transform(array: any[], sortBy: string, order: string = 'asc'): any[] {
    return orderBy(array, [sortBy], 'asc');
  }
}
