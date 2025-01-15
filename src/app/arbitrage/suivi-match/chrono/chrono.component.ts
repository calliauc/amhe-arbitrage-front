import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CdTimerComponent, CdTimerModule } from 'angular-cd-timer';
import { TimerStatus } from '../../../shared/models/timer-tick';
import { Match } from '../../../shared/models/match';

@Component({
  selector: 'app-chrono',
  standalone: true,
  imports: [CommonModule, CdTimerModule],
  templateUrl: './chrono.component.html',
  styleUrl: './chrono.component.css',
})
export class ChronoComponent implements AfterViewInit {
  @Input() match!: Match;
  @Output() timerTick: EventEmitter<TimerStatus> = new EventEmitter();
  @Output() timerFin: EventEmitter<number> = new EventEmitter();
  @ViewChild('basicTimer') chrono!: CdTimerComponent;

  estDemarre: boolean = false;
  estEnPause: boolean = false;
  estFini: boolean = false;
  tickActuel: number = 0;

  ngAfterViewInit(): void {
    this.chrono.stop();
  }

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
    this.tickActuel = timerStatus.tick_count;
    if (timerStatus.tick_count % 5 == 0) {
      this.timerTick.emit(timerStatus);
    }
  }

  complete() {
    this.estFini = true;
    this.timerFin.emit(this.tickActuel);
  }

  terminerMatch() {
    this.chrono.stop();
    this.estFini = true;
    this.timerFin.emit(this.tickActuel);
  }
}
