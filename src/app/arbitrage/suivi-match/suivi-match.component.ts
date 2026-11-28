import { Component, EventEmitter, Input, Output, inject, ChangeDetectionStrategy } from '@angular/core';
import { ChronoComponent } from './chrono/chrono.component';
import { Match } from '../../shared/models/match';
import { MatchsService } from '../../shared/services/matchs.service';
import { ScoreInscritMatchComponent } from './score-inscrit-match/score-inscrit-match.component';
import { InscritMatchComponent } from './inscrit-match/inscrit-match.component';
import { FinMatchModalComponent } from '../../shared/modales/fin-match-modal/fin-match-modal.component';
import { Inscrit } from '../../shared/models/inscrit';

@Component({
    selector: 'app-gestion-match',
    imports: [ScoreInscritMatchComponent, ChronoComponent, InscritMatchComponent, FinMatchModalComponent],
    templateUrl: './suivi-match.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './suivi-match.component.css'
})
export class SuiviMatchComponent {
  private matchsService = inject(MatchsService);

  @Input() match!: Match;
  @Output() matchEvent = new EventEmitter<null>();
  @Output() timer = new EventEmitter<number>();

  estModaleSaisieVisible = false;

  updateTimer(tick_count: number) {
    this.timer.emit(tick_count);
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

  saisirFinMatch(){
    this.estModaleSaisieVisible = true;
  }

  annulerSaisieFinMatch(){
    this.estModaleSaisieVisible = false;
  }

  enregistrerMatchNull(egalite: boolean) {    
    this.match.matchNull = egalite;
    this.match.vainqueur = undefined;
    this.enregistrerMatchFini();
  }

  enregistrerVainqueurMatch(vainqueur: Inscrit) {
    this.match.vainqueur = vainqueur;
    this.match.matchNull = false;
    this.enregistrerMatchFini();
  }

  enregistrerMatchFini(){
    this.estModaleSaisieVisible = false;
    this.match.statut="fini";
    this.matchsService.enregistrerMatchFini(this.match).subscribe(() => 
      this.matchsService.enregistrerResultatMatch(this.match).subscribe(()=>
        this.matchEvent.emit()
    )
  );
  }
}
