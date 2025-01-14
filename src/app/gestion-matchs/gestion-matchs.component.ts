import { Component, OnInit } from '@angular/core';
import { MatchsService } from '../shared/services/matchs.service';
import { Match } from '../shared/models/match';
import { ClubPipe } from '../shared/pipes/club.pipe';
import { NomsPipe } from '../shared/pipes/noms.pipe';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationModalComponent } from '../shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-gestion-matchs',
  standalone: true,
  imports: [RouterLink, ClubPipe, NomsPipe, ConfirmationModalComponent],
  templateUrl: './gestion-matchs.component.html',
  styleUrl: './gestion-matchs.component.css',
})
export class GestionMatchsComponent implements OnInit {
  matchs: Match[] = [];
  estModalVisible: boolean = false;
  titreModal: string = 'Confirmer la suppression ?';
  texteModal: string = 'Cette action est définitive';

  constructor(private matchsService: MatchsService, private router: Router) {}

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.matchsService.getMatchs().subscribe((matchs) => {
      this.matchs = matchs;
      console.log(this.matchs);
    });
  }

  creerMatch() {
    this.router.navigate(['creer-match']);
  }

  demanderSuppression(): void {
    this.estModalVisible = true;
  }

  confirmerSuppression(id: number) {
    this.estModalVisible = false;
    this.matchsService.supprimerMatch(id).subscribe((_) => this.refreshList());
  }

  annulerSuppression() {
    this.estModalVisible = false;
  }
}
