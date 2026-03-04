import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timerReverse',
  standalone: true,
})
export class TimerReversePipe implements PipeTransform {
  transform(sensInverse: boolean | undefined): string {
    return sensInverse ? '⏬' : '⏫';
  }
}
