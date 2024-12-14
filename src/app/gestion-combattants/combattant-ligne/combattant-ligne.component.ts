import { Component, Input } from '@angular/core';
import { Combattant } from '../../shared/classes/combattant';
import { CombattantAfficherComponent } from '../combattant-afficher/combattant-afficher.component';
import { CombattantEditerComponent } from '../combattant-editer/combattant-editer.component';

@Component({
  selector: 'app-combattant-ligne',
  standalone: true,
  imports: [CombattantAfficherComponent, CombattantEditerComponent],
  templateUrl: './combattant-ligne.component.html',
  styleUrl: './combattant-ligne.component.css',
})
export class CombattantLigneComponent {
  @Input() combattant!: Combattant;
  @Input() estPair!: boolean;
  estModif: boolean;

  constructor() {
    this.estModif = false;
  }

  lancerEdition(): void {
    this.estModif = true;
  }

  modifCombattantAnnulee() {
    this.estModif = false;
  }

  modifCombattantTerminee(combattantModifie: Combattant) {
    this.combattant = combattantModifie;
    this.estModif = false;
  }
}
