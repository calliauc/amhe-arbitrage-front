import { Component } from '@angular/core';
import { CoupLongswordComponent } from './coup-longsword/coup-longsword.component';
import { HistoriqueCoupsComponent } from './historique-coups/historique-coups.component';
import { SuiviMatchComponent } from './suivi-match/suivi-match.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Match } from '../shared/models/match';
import { MatchsService } from '../shared/services/matchs.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-arbitrage',
  standalone: true,
  imports: [
    CoupLongswordComponent,
    SuiviMatchComponent,
    HistoriqueCoupsComponent,
    CommonModule,
  ],
  templateUrl: './arbitrage.component.html',
  styleUrl: './arbitrage.component.css',
})
export class ArbitrageComponent {
  match!: Match;
  constructor(
    private route: ActivatedRoute,
    private matchsService: MatchsService,
    private router: Router
  ) {
    this.route.queryParams.subscribe((matchInput) => {
      this.matchsService.getMatchById(matchInput['id']).subscribe((match) => {
        if (match) {
          this.match = match;
          console.log(this.match);
        } else {
          console.log('Pas de match');
          this.router.navigate(['creer-match']);
        }
      });
    });
  }
}
