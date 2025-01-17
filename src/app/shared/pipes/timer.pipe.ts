import { Pipe, PipeTransform } from '@angular/core';
import { Club } from '../models/club';

@Pipe({
  name: 'timer',
  standalone: true,
})
export class TimerPipe implements PipeTransform {
  transform(secondes: number | undefined): string {
    if (secondes) return `${~~(secondes / 60)}:${secondes % 60}`;
    return '00:00';
  }
}
