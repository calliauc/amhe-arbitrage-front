import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Item } from '../../../shared/models/item';
import { RolesNames } from '../../../shared/models/roles';
import { TagEditerComponent } from '../tag-editer/tag-editer.component';
import { TagAfficherComponent } from '../tag-afficher/tag-afficher.component';

@Component({
    selector: 'app-tag-ligne',
    imports: [TagAfficherComponent, TagEditerComponent],
    templateUrl: './tag-ligne.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './tag-ligne.component.css'
})
export class TagLigneComponent {
  @Input() tag!: Item;
  @Input() estPair!: boolean;
  @Input() role!: RolesNames;
  @Output() supprimerTag = new EventEmitter<number>();
  @Output() modifierTag = new EventEmitter<Item>();
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

  suppressionTag(id: number) {
    this.estModif = false;
    this.supprimerTag.emit(id);
  }

  modifTagTerminee(tagModifie: Item) {
    this.modifierTag.emit(tagModifie);
    this.estModif = false;
  }
}
