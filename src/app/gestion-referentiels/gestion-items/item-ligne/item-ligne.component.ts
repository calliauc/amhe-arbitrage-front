import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Item } from '../../../shared/models/item';
import { RolesNames } from '../../../shared/models/roles';
import { ItemEditerComponent } from '../item-editer/item-editer.component';
import { ItemAfficherComponent } from '../item-afficher/item-afficher.component';

@Component({
    selector: 'app-item-ligne',
    imports: [ItemAfficherComponent, ItemEditerComponent],
    templateUrl: './item-ligne.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './item-ligne.component.css'
})
export class ItemLigneComponent {
  @Input() item!: Item;
  @Input() estPair!: boolean;
  @Input() role!: RolesNames;
  @Output() supprimerItem = new EventEmitter<number>();
  @Output() modifierItem = new EventEmitter<Item>();
  estModif: boolean;

  constructor() {
    this.estModif = false;
  }

  lancerEdition(): void {
    this.estModif = true;
  }

  modifItemAnnulee() {
    this.estModif = false;
  }

  suppressionItem(id: number) {
    this.estModif = false;
    this.supprimerItem.emit(id);
  }

  modifItemTerminee(itemModifie: Item) {
    this.modifierItem.emit(itemModifie);
    this.estModif = false;
  }
}
