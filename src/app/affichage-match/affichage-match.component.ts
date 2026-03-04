import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchsService } from '../shared/services/matchs.service';
import { Match } from '../shared/models/match';
import { HistoriqueCoupsComponent } from '../arbitrage/historique-coups/historique-coups.component';
import { AfficherCombattantCardComponent } from './afficher-combattant-card/afficher-combattant-card.component';

@Component({
    selector: 'app-affichage-match',
    imports: [HistoriqueCoupsComponent, AfficherCombattantCardComponent],
    templateUrl: './affichage-match.component.html',
    styleUrl: './affichage-match.component.css'
})
export class AffichageMatchComponent {
  private route = inject(ActivatedRoute);
  private matchsService = inject(MatchsService);
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
  }

  refreshMatch() {
    this.matchsService.getMatchById(this.matchId).subscribe((match) => {
      this.match = match;
    });
  }
}
