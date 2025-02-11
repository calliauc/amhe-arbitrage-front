import { Component, OnInit } from '@angular/core';
import { MatchsService } from '../shared/services/matchs.service';
import { Match } from '../shared/models/match';
import { Router } from '@angular/router';
import { MatchAfficherComponent } from './match-afficher/match-afficher.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-gestion-matchs',
  standalone: true,
  imports: [MatchAfficherComponent, LoginComponent],
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
  estModateSecuVisible: boolean = false;
  estLectureSeule: boolean = true;

  constructor(private matchsService: MatchsService, private router: Router) {}

  ngOnInit(): void {
    this.refreshList();
  }

  updateLogin(lock: boolean) {
    this.estLectureSeule = lock;
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
      .subscribe((_) => this.refreshList());
  }

  annulerSuppression() {
    this.estModalVisible = false;
  }
}
