import { Component, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HistoriqueCoupsComponent } from './historique-coups/historique-coups.component';
import { SuiviMatchComponent } from './suivi-match/suivi-match.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Match } from '../shared/models/match';
import { MatchsService } from '../shared/services/matchs.service';
import { AuthV1Service } from '../shared/services/auth-v1.service';
import { RolesNames } from '../shared/models/roles';
import { SaisieEchangeComponent } from './saisie-echange/saisie-echange.component';
import { MenuMobileService } from '../shared/services/menu-mobile.service';

@Component({
    selector: 'app-arbitrage',
    imports: [
    SaisieEchangeComponent,
    SuiviMatchComponent,
    HistoriqueCoupsComponent
],
    templateUrl: './arbitrage.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './arbitrage.component.css'
})
export class ArbitrageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private matchsService = inject(MatchsService);
  private menuMobileService = inject(MenuMobileService);
  private logService = inject(AuthV1Service);
  private router = inject(Router);

  match!: Match;
  matchId!: number;
  role:RolesNames="guest";

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
    this.menuMobileService.pageActuelle.next('ARBITRAGE');
    this.logService.notificationRole$.subscribe(e => {
      if (AuthV1Service.noAuth(e)){
        this.router.navigate(['match', this.matchId, 'details']);
      }
      this.role = e;
    });
  }

  refreshMatch() {
    this.matchsService.getMatchById(this.match.id).subscribe((match) => {
      this.match = match;
      console.log(this.match);
    });
  }
}
