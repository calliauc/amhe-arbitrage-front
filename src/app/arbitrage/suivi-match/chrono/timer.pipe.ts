import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer',
  standalone: true,
})
export class TimerPipe implements PipeTransform {
  transform(timer: number): string {
    const minutes = Math.floor(timer / 60)
      .toString()
      .padStart(2, '0');
    const secondes = (timer % 60).toString().padStart(2, '0');
    return `${minutes}:${secondes}`;
  }
}
