import { Pipe, PipeTransform } from '@angular/core';
import { Echange } from '../models/echange';

@Pipe({
  name: 'echangeDisplay',
  standalone: true,
})
export class DetailsEchangePipe implements PipeTransform {
  transform(coup: Echange): string {
    let details = '';
    // details += coup.doubleAtk ? '[Da] ' : '';
    // details += coup.doubleDef ? '[Dd] ' : '';
    // details += coup.afterblow ? '[A] ' : '';
    // details += coup.simultanee ? '[S] ' : '';
    // details += coup.faute ? '[F] ' : '';
    details += details.length > 0 ? '- ' : '';
    return details;
  }
}
