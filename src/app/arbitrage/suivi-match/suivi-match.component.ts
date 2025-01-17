import { Component, Input, OnInit } from '@angular/core';
import { ScoreCombattantComponent } from './score-combattant/score-combattant.component';
import { ChronoComponent } from './chrono/chrono.component';
import { Match } from '../../shared/models/match';
import { CombattantComponent } from './combattant/combattant.component';
import { MatchsService } from '../../shared/services/matchs.service';
import { tick } from '@angular/core/testing';
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

  updateScoreBleu(scoreBleu: number) {
    this.match.scoreBleu = scoreBleu;
    this.matchsService
      .modifierMatch(this.match)
      .subscribe((match) => (this.match = match));
  }

  updateScoreRouge(scoreRouge: number) {
    this.match.scoreRouge = scoreRouge;
    this.matchsService
      .modifierMatch(this.match)
      .subscribe((match) => (this.match = match));
  }

  timerTick(timerEvent: TimerStatus) {
    this.match.timerStart = timerEvent.tick_count;
    this.matchsService
      .modifierMatch(this.match)
      .subscribe((match) => (this.match = match));
  }

  timerFin(tick_count: number) {
    this.match.timerStart = tick_count;
    this.matchsService
      .modifierMatch(this.match)
      .subscribe((match) => (this.match = match));
  }
}
