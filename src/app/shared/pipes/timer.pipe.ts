import { Pipe, PipeTransform } from '@angular/core';
import { Club } from '../models/club';

@Pipe({
  name: 'timer',
  standalone: true,
})
export class TimerPipe implements PipeTransform {
  transform(timer: number | undefined): string {
    if (timer) {
      let minutes = (~~(timer / 60)).toString().padStart(2, '0');
      let secondes = (timer % 60).toString().padStart(2, '0');
      return `${minutes}'${secondes}"`;
    }
    return `00'00"`;
  }
}
