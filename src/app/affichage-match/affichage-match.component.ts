import { Component, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchsService } from '../shared/services/matchs.service';
import { Match } from '../shared/models/match';
import { HistoriqueCoupsComponent } from '../arbitrage/historique-coups/historique-coups.component';
import { AfficherCombattantCardComponent } from './afficher-combattant-card/afficher-combattant-card.component';
import { LogService } from '../shared/services/log.service';

@Component({
    selector: 'app-affichage-match',
    imports: [HistoriqueCoupsComponent, AfficherCombattantCardComponent],
    templateUrl: './affichage-match.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './affichage-match.component.css'
})
export class AffichageMatchComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private matchsService = inject(MatchsService);
  private logService = inject(LogService);
  private router = inject(Router);

  estLog = false;
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
  }

  ngOnInit(): void {
    this.logService.notification$.subscribe(e => this.estLog = e)
  }

  refreshMatch() {
    this.matchsService.getMatchById(this.matchId).subscribe((match) => {
      this.match = match;
    });
  }
}
