import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer',
  standalone: true,
})
export class TimerPipe implements PipeTransform {
  transform(timer: number): string {
    let minutes = Math.floor(timer / 60)
      .toString()
      .padStart(2, '0');
    let secondes = (timer % 60).toString().padStart(2, '0');
    return `${minutes}:${secondes}`;
  }
}
