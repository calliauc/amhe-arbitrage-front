import { Component, OnInit } from '@angular/core';
import { LigneCoupComponent } from './ligne-histo-coup/ligne-coup.component';
import { Coup } from '../../shared/models/coup';
import { CoupsService } from '../../shared/services/coups.service';

@Component({
  selector: 'app-historique-coups',
  standalone: true,
  imports: [LigneCoupComponent],
  templateUrl: './historique-coups.component.html',
  styleUrl: './historique-coups.component.css',
})
export class HistoriqueCoupsComponent implements OnInit {
  listeCoups?: Coup[];
  subscription: any;

  constructor(private coupsService: CoupsService) {}

  ngOnInit(): void {
    this.listeCoups = this.coupsService.getListeCoups();
    this.subscription = this.coupsService.ajoutCoup.subscribe(
      (nouveauCoup: Coup) => this.ajoutCoup(nouveauCoup)
    );
  }

  ajoutCoup(nouveauCoup: Coup) {
    this.listeCoups?.push(nouveauCoup);
  }

  suprimerCoup(coupASupprimer: Coup) {
    this.listeCoups = this.coupsService.suprimerCoup(coupASupprimer);
  }
}
