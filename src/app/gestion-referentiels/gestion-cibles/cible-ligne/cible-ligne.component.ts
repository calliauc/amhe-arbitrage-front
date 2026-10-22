import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CibleAfficherComponent } from '../cible-afficher/cible-afficher.component';
import { CibleEditerComponent } from '../cible-editer/cible-editer.component';
import { Item } from '../../../shared/models/item';
import { RolesNames } from '../../../shared/models/roles';

@Component({
    selector: 'app-cible-ligne',
    imports: [CibleAfficherComponent, CibleEditerComponent],
    templateUrl: './cible-ligne.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './cible-ligne.component.css'
})
export class CibleLigneComponent {
  @Input() cible!: Item;
  @Input() estPair!: boolean;
  @Input() role!: RolesNames;
  @Output() supprimerCible = new EventEmitter<number>();
  @Output() modifierCible = new EventEmitter<Item>();
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

  modifCibleTerminee(cibleModifie: Item) {
    this.modifierCible.emit(cibleModifie);
    this.estModif = false;
  }
}
