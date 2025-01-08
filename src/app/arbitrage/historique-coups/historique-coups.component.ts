import { Component, OnInit } from '@angular/core';
import { LigneHistoCoupComponent } from './ligne-histo-coup/ligne-histo-coup.component';
import { HistoCoup } from '../../shared/classes/histo-coup';
import { CoupsService } from '../../shared/services/coups.service';

@Component({
  selector: 'app-historique-coups',
  standalone: true,
  imports: [LigneHistoCoupComponent],
  templateUrl: './historique-coups.component.html',
  styleUrl: './historique-coups.component.css',
})
export class HistoriqueCoupsComponent implements OnInit {
  listeCoups?: HistoCoup[];
  subscription: any;

  constructor(private coupsService: CoupsService) {}

  ngOnInit(): void {
    this.listeCoups = this.coupsService.getListeCoups();
    this.subscription = this.coupsService.ajoutCoup.subscribe(
      (nouveauCoup: HistoCoup) => this.ajoutCoup(nouveauCoup)
    );
  }

  ajoutCoup(nouveauCoup: HistoCoup) {
    this.listeCoups?.push(nouveauCoup);
  }

  suprimerCoup(coupASupprimer: HistoCoup) {
    this.listeCoups = this.coupsService.suprimerCoup(coupASupprimer);
  }
}
