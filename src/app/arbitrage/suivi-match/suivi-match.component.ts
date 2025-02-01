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
  @Output() matchEvent: EventEmitter<null> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {}

  constructor(private matchsService: MatchsService) {}

  updateTimer(tick_count: number) {
    this.matchsService
      .modifierTimerMatch(this.match.id, tick_count)
      .subscribe();
  }

  updateScoreA(scoreA: number) {
    this.matchsService
      .modifierScoreAMatch(this.match.id, scoreA)
      .subscribe((_) => this.matchEvent.emit());
  }

  updateScoreB(scoreB: number) {
    this.matchsService
      .modifierScoreBMatch(this.match.id, scoreB)
      .subscribe((_) => this.matchEvent.emit());
  }

  setDebutMatch() {
    this.matchsService
      .modifierDateDebutMatch(this.match.id, new Date())
      .subscribe((_) => this.matchEvent.emit());
  }

  setFinMatch(tick_count: number) {
    this.matchsService
      .modifierDateFinMatch(this.match.id, new Date(), tick_count)
      .subscribe((_) => this.matchEvent.emit());
  }
}
