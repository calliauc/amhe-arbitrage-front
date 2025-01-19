import { Component, Input, OnInit } from '@angular/core';
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
export class SuiviMatchComponent {
  @Input() match!: Match;

  constructor(private matchsService: MatchsService) {}

  updateScoreA(scoreA: number) {
    this.match.scoreA = scoreA;
    this.matchsService
      .modifierMatch(this.match)
      .subscribe((match) => (this.match = match));
  }

  updateScoreB(scoreB: number) {
    this.match.scoreB = scoreB;
    this.matchsService
      .modifierMatch(this.match)
      .subscribe((match) => (this.match = match));
  }

  timerTick(timerEvent: TimerStatus) {
    this.match.timer = timerEvent.tick_count;
    this.matchsService
      .modifierMatch(this.match)
      .subscribe((match) => (this.match = match));
  }

  timerFin(tick_count: number) {
    this.match.timer = tick_count;
    this.matchsService
      .modifierMatch(this.match)
      .subscribe((match) => (this.match = match));
  }
}
