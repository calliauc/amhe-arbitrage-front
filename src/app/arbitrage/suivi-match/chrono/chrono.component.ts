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
import { MatchsService } from '../../../shared/services/matchs.service';

@Component({
  selector: 'app-chrono',
  standalone: true,
  imports: [CommonModule, CdTimerModule],
  templateUrl: './chrono.component.html',
  styleUrl: './chrono.component.css',
})
export class ChronoComponent implements AfterViewInit {
  @Input() match!: Match;
  @Output() timerEvent: EventEmitter<number> = new EventEmitter();
  @Output() timerDebutEvent: EventEmitter<null> = new EventEmitter();
  @Output() timerFinEvent: EventEmitter<number> = new EventEmitter();
  @ViewChild('basicTimer') chrono!: CdTimerComponent;

  estDemarre: boolean = false;
  estEnPause: boolean = false;
  estFini: boolean = false;
  tickActuel: number = 0;

  constructor(private matchsService: MatchsService) {}

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
      this.timerDebutEvent.emit();
      this.chrono.start();
      this.estDemarre = true;
      this.estEnPause = false;
    }
  }

  tick(timerStatus: TimerStatus) {
    this.tickActuel = timerStatus.tick_count;
    if (timerStatus.tick_count % 5 == 0) {
      this.timerEvent.emit(this.tickActuel);
    }
  }

  complete() {
    this.estFini = true;
    this.timerFinEvent.emit(this.tickActuel);
  }

  terminerMatch() {
    this.chrono.stop();
    this.estFini = true;
    this.timerFinEvent.emit(this.tickActuel);
  }
}
