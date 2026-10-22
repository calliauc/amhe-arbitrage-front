import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { VulnerantAfficherComponent } from '../vulnerant-afficher/vulnerant-afficher.component';
import { VulnerantEditerComponent } from '../vulnerant-editer/vulnerant-editer.component';
import { Item } from '../../../shared/models/item';
import { RolesNames } from '../../../shared/models/roles';

@Component({
    selector: 'app-vulnerant-ligne',
    imports: [VulnerantAfficherComponent, VulnerantEditerComponent],
    templateUrl: './vulnerant-ligne.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './vulnerant-ligne.component.css'
})
export class VulnerantLigneComponent {
  @Input() vulnerant!: Item;
  @Input() estPair!: boolean;
  @Input() role!: RolesNames;
  @Output() supprimerVulnerant = new EventEmitter<number>();
  @Output() modifierVulnerant = new EventEmitter<Item>();
  estModif: boolean;

  constructor() {
    this.estModif = false;
  }

  lancerEdition(): void {
    this.estModif = true;
  }

  modifVulnerantAnnulee() {
    this.estModif = false;
  }

  suppressionVulnerant(id: number) {
    this.estModif = false;
    this.supprimerVulnerant.emit(id);
  }

  modifVulnerantTerminee(vulnerantModifie: Item) {
    this.modifierVulnerant.emit(vulnerantModifie);
    this.estModif = false;
  }
}
