import { Component, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CreationCoupComponent } from './creation-coup/creation-coup.component';
import { HistoriqueCoupsComponent } from './historique-coups/historique-coups.component';
import { SuiviMatchComponent } from './suivi-match/suivi-match.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Match } from '../shared/models/match';
import { MatchsService } from '../shared/services/matchs.service';
import { LogService } from '../shared/services/log.service';

@Component({
    selector: 'app-arbitrage',
    imports: [
    CreationCoupComponent,
    SuiviMatchComponent,
    HistoriqueCoupsComponent
],
    templateUrl: './arbitrage.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './arbitrage.component.css'
})
export class ArbitrageComponent {
  private route = inject(ActivatedRoute);
  private matchsService = inject(MatchsService);
  private logService = inject(LogService);
  private router = inject(Router);

  match!: Match;
  matchId!: number;

  constructor() {
    this.route.params.subscribe((params) => {
      this.matchsService.getMatchById(params['id']).subscribe((match) => {
        if (match) {
          this.match = match;
          console.log(match);
        } else {
          alert('Match introuvable');
          this.router.navigate(['matchs']);
        }
      });
      this.matchId = params['id'];
    });
    this.logService.notification$.subscribe(e => {
      if (!e){
        this.router.navigate(['match', this.matchId, 'details']);
      }
    })
  }

  refreshMatch() {
    this.matchsService.getMatchById(this.match.id).subscribe((match) => {
      this.match = match;
      console.log(this.match);
    });
  }
}
