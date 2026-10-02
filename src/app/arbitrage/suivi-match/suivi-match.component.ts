import { Component, EventEmitter, Input, Output, inject, ChangeDetectionStrategy } from '@angular/core';
import { ScoreCombattantComponent } from './score-combattant/score-combattant.component';
import { ChronoComponent } from './chrono/chrono.component';
import { Match } from '../../shared/models/match';
import { CombattantComponent } from './combattant/combattant.component';
import { MatchsService } from '../../shared/services/matchs.service';

@Component({
    selector: 'app-gestion-match',
    imports: [ScoreCombattantComponent, ChronoComponent, CombattantComponent],
    templateUrl: './suivi-match.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './suivi-match.component.css'
})
export class SuiviMatchComponent {
  private matchsService = inject(MatchsService);

  @Input() match!: Match;
  @Output() matchEvent = new EventEmitter<null>();


  updateTimer(tick_count: number) {
    this.matchsService
      .modifierTimerMatch(this.match.id, tick_count)
      .subscribe();
  }

  updateScoreA(scoreA: number) {
    this.matchsService
      .modifierScoreAMatch(this.match.id, scoreA)
      .subscribe(() => this.matchEvent.emit());
  }

  updateScoreB(scoreB: number) {
    this.matchsService
      .modifierScoreBMatch(this.match.id, scoreB)
      .subscribe(() => this.matchEvent.emit());
  }

  setDebutMatch() {
    this.matchsService
      .modifierDateDebutMatch(this.match.id, new Date())
      .subscribe(() => this.matchEvent.emit());
  }

  setFinMatch(tick_count: number) {
    this.matchsService
      .modifierDateFinMatch(this.match.id, new Date(), tick_count)
      .subscribe(() => this.matchEvent.emit());
  }
}
