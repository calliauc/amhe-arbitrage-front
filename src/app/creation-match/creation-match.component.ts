import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Match } from '../shared/classes/match';
import { MatchsService } from '../shared/services/matchs.service';

@Component({
  selector: 'app-creation-match',
  standalone: true,
  imports: [],
  templateUrl: './creation-match.component.html',
  styleUrl: './creation-match.component.css',
})
export class CreationMatchComponent {
  constructor(private router: Router, private matchService: MatchsService) {}

  creerMatch() {
    let match = new Match();
    match.idB = 124;
    match = this.matchService.creerMatch(match);
    this.router.navigate(['arbitrage'], { queryParams: { id: match.id } });
  }

  ruleset() {
    /**
     * Pré-remplit les scores, timer, arme et autre
     * selon le ruleset sélectionné
     *
     * Par exemple pour l'épée longue :
     *  les scores à 6 et le timer à 0 croissant
     */
  }
}
