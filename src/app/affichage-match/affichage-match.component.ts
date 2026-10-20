import { Component, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchsService } from '../shared/services/matchs.service';
import { Match } from '../shared/models/match';
import { HistoriqueCoupsComponent } from '../arbitrage/historique-coups/historique-coups.component';
import { AuthV1Service } from '../shared/services/auth-v1.service';
import { AfficherinscritCardComponent } from './afficher-inscrit-card/afficher-inscrit-card.component';
import { RolesNames } from '../shared/models/roles';

@Component({
    selector: 'app-affichage-match',
    imports: [HistoriqueCoupsComponent, AfficherinscritCardComponent],
    templateUrl: './affichage-match.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './affichage-match.component.css'
})
export class AffichageMatchComponent implements OnInit {
  private Auth = AuthV1Service;
  private route = inject(ActivatedRoute);
  private matchsService = inject(MatchsService);
  private logService = inject(AuthV1Service);
  private router = inject(Router);

  role:RolesNames = 'guest';
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
    this.logService.notificationRole$.subscribe(e => this.role = e)
  }

  refreshMatch() {
    this.matchsService.getMatchById(this.matchId).subscribe((match) => {
      this.match = match;
    });
  }

  arbitrerMatch() {
    this.router.navigate(['match', this.matchId, 'arbitrage']);
  }
}
