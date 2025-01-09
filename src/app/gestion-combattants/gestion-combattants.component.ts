import { Component, OnInit } from '@angular/core';
import { CombattantsService } from '../shared/services/combattants.service';
import { Combattant } from '../shared/classes/combattant';
import { CombattantLigneComponent } from './combattant-ligne/combattant-ligne.component';
import { CombattantEditerComponent } from './combattant-editer/combattant-editer.component';
import { ClubsService } from '../shared/services/clubs.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gestion-combattants',
  standalone: true,
  imports: [CombattantLigneComponent, CombattantEditerComponent],
  templateUrl: './gestion-combattants.component.html',
  styleUrl: './gestion-combattants.component.css',
})
export class GestionCombattantsComponent implements OnInit {
  combattentsListe?: Combattant[];
  estModeCreation: boolean;
  nouveauCombattant: Combattant;
  constructor(
    private combattantsService: CombattantsService,
    private clubsService: ClubsService
  ) {
    this.estModeCreation = false;
    this.nouveauCombattant = new Combattant();
  }

  ngOnInit(): void {
    this.recupererCombattants();
    // this.clubsService.getClubs();
  }

  modeAjout(): void {
    this.estModeCreation = true;
  }

  annulerEdition() {
    this.estModeCreation = false;
  }

  recupererCombattants() {
    this.combattantsService.getCombattants().subscribe((result) => {
      this.combattentsListe = result;
      console.log('Liste', this.combattentsListe);
    });
  }

  creerCombattant(nouveauCombattant: Combattant) {
    this.combattentsListe?.push(nouveauCombattant);
    this.estModeCreation = false;
  }

  supprimerCombattant(id: number) {
    this.combattantsService
      .supprimerCombattant(id)
      .subscribe(() => this.recupererCombattants());
  }
}
