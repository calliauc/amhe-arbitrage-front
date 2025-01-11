import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { TimerPipe } from './timer.pipe';
import { CdTimerComponent, CdTimerModule } from 'angular-cd-timer';

@Component({
  selector: 'app-chrono',
  standalone: true,
  imports: [CommonModule, CdTimerModule],
  templateUrl: './chrono.component.html',
  styleUrl: './chrono.component.css',
})
export class ChronoComponent {
  @ViewChild('basicTimer') chrono!: CdTimerComponent;
  timerStart: number = 0;
  timerEnd: number = 8;
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

  complete() {
    console.log('Fini');
    this.estFini = true;
  }
}
