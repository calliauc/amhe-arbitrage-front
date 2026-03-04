import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { CdTimerComponent, CdTimerModule } from 'angular-cd-timer';
import { TimerStatus } from '../../../shared/models/timer-tick';
import { Match } from '../../../shared/models/match';
import { MatchsService } from '../../../shared/services/matchs.service';

@Component({
    selector: 'app-chrono',
    imports: [CommonModule, CdTimerModule],
    templateUrl: './chrono.component.html',
    styleUrl: './chrono.component.css'
})
export class ChronoComponent implements AfterViewInit {
  private matchsService = inject(MatchsService);

  @Input() match!: Match;
  @Output() timerEvent = new EventEmitter<number>();
  @Output() timerDebutEvent = new EventEmitter<null>();
  @Output() timerFinEvent = new EventEmitter<number>();
  @ViewChild('basicTimer') chrono!: CdTimerComponent;

  estDemarre = false;
  estEnPause = false;
  estFini = false;
  tickActuel = 0;

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
