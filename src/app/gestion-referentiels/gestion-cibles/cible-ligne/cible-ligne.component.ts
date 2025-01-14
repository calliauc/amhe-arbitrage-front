import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CibleAfficherComponent } from '../cible-afficher/cible-afficher.component';
import { CibleEditerComponent } from '../cible-editer/cible-editer.component';
import { Cible } from '../../../shared/models/cible';

@Component({
  selector: 'app-cible-ligne',
  standalone: true,
  imports: [CibleAfficherComponent, CibleEditerComponent],
  templateUrl: './cible-ligne.component.html',
  styleUrl: './cible-ligne.component.css',
})
export class CibleLigneComponent {
  @Input() cible!: Cible;
  @Input() estPair!: boolean;
  @Output() supprimerCible: EventEmitter<number> = new EventEmitter();
  @Output() modifierCible: EventEmitter<Cible> = new EventEmitter();
  estModif: boolean;

  constructor() {
    this.estModif = false;
  }

  lancerEdition(): void {
    this.estModif = true;
  }

  modifCibleAnnulee() {
    this.estModif = false;
  }

  suppressionCible(id: number) {
    this.estModif = false;
    this.supprimerCible.emit(id);
  }

  modifCibleTerminee(cibleModifie: Cible) {
    this.modifierCible.emit(cibleModifie);
    this.estModif = false;
  }
}
