import { Pipe, PipeTransform } from '@angular/core';
import { Combattant } from '../models/combattant';

@Pipe({
  name: 'filtre',
  standalone: true,
})
export class FiltrePipe implements PipeTransform {
  transform<T>(list: Array<T>, filtre: string, critere?: string): Array<T> {
    if (filtre === '')
      return list;

    return list.filter((item : T)=>{
      let valueToCheck: string = critere
      ? item[critere as keyof typeof item ] as string
      : `${item}`;

      return valueToCheck?.toLowerCase().includes(filtre.toLowerCase());

    } )
  }
}
