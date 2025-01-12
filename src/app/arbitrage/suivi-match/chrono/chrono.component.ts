import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { CdTimerComponent, CdTimerModule } from 'angular-cd-timer';
import { TimerStatus } from '../../../shared/models/timer-tick';

@Component({
  selector: 'app-chrono',
  standalone: true,
  imports: [CommonModule, CdTimerModule],
  templateUrl: './chrono.component.html',
  styleUrl: './chrono.component.css',
})
export class ChronoComponent {
  @ViewChild('basicTimer') chrono!: CdTimerComponent;
  timerStart: number = 55;
  timerEnd: number = 90;
  timerReverse: boolean = false;
  interval?: any;
  estDemarre: boolean = false;
  estEnPause: boolean = false;
  estFini: boolean = false;

  controlTimer() {
    if (this.estDemarre) {
      if (this.estEnPause) {
        this.chrono.resume();
        this.estEnPause = false;
      } else {
        this.chrono.stop();
        this.estEnPause = true;
      }
    } else {
      this.chrono.start();
      this.estDemarre = true;
      this.estEnPause = false;
    }
  }

  tick(timerStatus: TimerStatus) {
    console.log(timerStatus);
  }

  complete() {
    console.log('Fini');
    this.estFini = true;
  }
}
