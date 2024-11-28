import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TimerPipe } from './timer.pipe';

@Component({
  selector: 'app-chrono',
  standalone: true,
  imports: [CommonModule, TimerPipe],
  templateUrl: './chrono.component.html',
  styleUrl: './chrono.component.css',
})
export class ChronoComponent {
  timeLeft: number = 0;
  interval?: any;
  playChrono: boolean = false;

  controlTimer() {
    if (!this.playChrono) {
      this.startTimer();
      this.playChrono = true;
    } else {
      this.pauseTimer();
      this.playChrono = false;
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.timeLeft++;
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
}
