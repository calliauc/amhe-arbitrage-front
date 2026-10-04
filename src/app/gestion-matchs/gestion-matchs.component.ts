import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatchsService } from '../shared/services/matchs.service';
import { Match } from '../shared/models/match';
import { Router } from '@angular/router';
import { MatchAfficherComponent } from './match-afficher/match-afficher.component';
import { HemaRatingService } from '../shared/services/hema-rating.sevice';
import { environment } from '../../environments/environment';
import { LogService } from '../shared/services/log.service';

@Component({
    selector: 'app-gestion-matchs',
    imports: [MatchAfficherComponent ],
    templateUrl: './gestion-matchs.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './gestion-matchs.component.css'
})
export class GestionMatchsComponent implements OnInit {
  private logService = inject(LogService);
  private matchsService = inject(MatchsService);
  private hemaRatingService = inject(HemaRatingService);
  private router = inject(Router);

  matchsNouveau: Match[] = [];
  matchsEnCours: Match[] = [];
  matchsFinis: Match[] = [];
  estModalVisible = false;
  titreModal = 'Confirmer la suppression ?';
  texteModal = 'Cette action est définitive';
  idASupprimer?: number;
  estModateSecuVisible = false;
  estLog = false;
  estScoresOk = false;
  env = environment;
  URL = `${this.env.baseUrl}/hema-rating/get-csv`;

  ngOnInit(): void {
    this.logService.notification$.subscribe(e => this.estLog = e)
    this.refreshList();
  }

  refreshList() {
    this.matchsService.getMatchs().subscribe((matchs) => {
      if (matchs) {
        this.matchsNouveau = matchs.filter(
          (match) => match.statut === 'nouveau'
        );
        this.matchsEnCours = matchs.filter(
          (match) => match.statut === 'en cours'
        );
        this.matchsFinis = matchs.filter((match) => match.statut === 'fini');
      } else {
        this.matchsNouveau = [];
        this.matchsEnCours = [];
        this.matchsFinis = [];
      }
    });
  }

  creerMatch() {
    this.router.navigate(['creer-match']);
  }

  demanderSuppression(id: number): void {
    this.idASupprimer = id;
    this.estModalVisible = true;
  }

  confirmerSuppression(id: number | string) {
    this.estModalVisible = false;
    this.matchsService
      .supprimerMatch(id as number)
      .subscribe(() => this.refreshList());
  }

  annulerSuppression() {
    this.estModalVisible = false;
  }

  editerScores() {
    this.hemaRatingService
      .calculerResultats()
      .subscribe(() => (this.estScoresOk = true));
  }
}
