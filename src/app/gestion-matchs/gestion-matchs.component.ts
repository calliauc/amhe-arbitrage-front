import { Component, OnInit } from '@angular/core';
import { MatchsService } from '../shared/services/matchs.service';
import { Match } from '../shared/models/match';
import { ClubPipe } from '../shared/pipes/club.pipe';
import { NomsPipe } from '../shared/pipes/noms.pipe';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationModalComponent } from '../shared/confirmation-modal/confirmation-modal.component';
import { DatePipe } from '@angular/common';
import { MatchAfficherComponent } from './match-afficher/match-afficher.component';

@Component({
  selector: 'app-gestion-matchs',
  standalone: true,
  imports: [
    RouterLink,
    ClubPipe,
    NomsPipe,
    ConfirmationModalComponent,
    DatePipe,
    MatchAfficherComponent,
  ],
  templateUrl: './gestion-matchs.component.html',
  styleUrl: './gestion-matchs.component.css',
})
export class GestionMatchsComponent implements OnInit {
  matchsNouveau: Match[] = [];
  matchsEnCours: Match[] = [];
  matchsFinis: Match[] = [];
  estModalVisible: boolean = false;
  titreModal: string = 'Confirmer la suppression ?';
  texteModal: string = 'Cette action est définitive';
  idASupprimer?: number;

  constructor(private matchsService: MatchsService, private router: Router) {}

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.matchsService.getMatchs().subscribe((matchs) => {
      this.matchsNouveau = matchs.filter((match) => match.statut === 'nouveau');
      this.matchsEnCours = matchs.filter(
        (match) => match.statut === 'en cours'
      );
      this.matchsFinis = matchs.filter((match) => match.statut === 'fini');
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
      .subscribe((_) => this.refreshList());
  }

  annulerSuppression() {
    this.estModalVisible = false;
  }
}
