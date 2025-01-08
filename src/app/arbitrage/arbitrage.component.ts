import { Component } from '@angular/core';
import { CoupLongswordComponent } from './coup-longsword/coup-longsword.component';
import { HistoriqueCoupsComponent } from './historique-coups/historique-coups.component';
import { SuiviMatchComponent } from './suivi-match/suivi-match.component';
import { ActivatedRoute } from '@angular/router';
import { Match } from '../shared/classes/match';
import { MatchsService } from '../shared/services/matchs.service';

@Component({
  selector: 'app-arbitrage',
  standalone: true,
  imports: [
    CoupLongswordComponent,
    SuiviMatchComponent,
    HistoriqueCoupsComponent,
  ],
  templateUrl: './arbitrage.component.html',
  styleUrl: './arbitrage.component.css',
})
export class ArbitrageComponent {
  match!: Match;
  constructor(
    private route: ActivatedRoute,
    private matchService: MatchsService
  ) {
    this.route.queryParams.subscribe(
      (matchInput) =>
        (this.match = this.matchService.findMatch(matchInput['id']))
    );
    console.log('Match trouvé', this.match);
    if (!this.match.id) {
      alert('Pas de match, veuillez créer ou ouvrir un match existant.');
      console.log('Pas de match');
      // Retour création
    }
  }
}
