import { Pipe, PipeTransform } from '@angular/core';
import { Club } from '../models/club';
import { Coup } from '../models/coup';

@Pipe({
  name: 'coupDisplay',
  standalone: true,
})
export class DetailsCoupPipe implements PipeTransform {
  transform(coup: Coup): string {
    let details = '';
    details += coup.doubleTouche ? '[D] ' : '';
    details += coup.simultanee ? '[S] ' : '';
    details += coup.faute ? '[F] ' : '';
    details += details.length > 0 ? '- ' : '';
    return details;
  }
}
