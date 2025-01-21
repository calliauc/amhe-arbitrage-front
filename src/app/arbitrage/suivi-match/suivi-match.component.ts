import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ScoreCombattantComponent } from './score-combattant/score-combattant.component';
import { ChronoComponent } from './chrono/chrono.component';
import { Match } from '../../shared/models/match';
import { CombattantComponent } from './combattant/combattant.component';
import { MatchsService } from '../../shared/services/matchs.service';
import { TimerStatus } from '../../shared/models/timer-tick';

@Component({
  selector: 'app-gestion-match',
  standalone: true,
  imports: [ScoreCombattantComponent, ChronoComponent, CombattantComponent],
  templateUrl: './suivi-match.component.html',
  styleUrl: './suivi-match.component.css',
})
export class SuiviMatchComponent implements OnChanges {
  @Input() match!: Match;
  @Output() matchEvent: EventEmitter<Match> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {}

  constructor(private matchsService: MatchsService) {}

  updateScoreA(scoreA: number) {
    this.match.scoreA = scoreA;
    this.matchEvent.emit(this.match);
  }

  updateScoreB(scoreB: number) {
    this.match.scoreB = scoreB;
    this.matchEvent.emit(this.match);
  }

  timerTick(timerEvent: TimerStatus) {
    this.match.timer = timerEvent.tick_count;
    this.matchEvent.emit(this.match);
  }

  timerFin(tick_count: number) {
    this.match.timer = tick_count;
    this.matchEvent.emit(this.match);
  }
}
