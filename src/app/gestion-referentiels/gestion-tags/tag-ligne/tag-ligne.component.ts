import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TagAfficherComponent } from '../tag-afficher/tag-afficher.component';
import { TagEditerComponent } from '../tag-editer/tag-editer.component';
import { Tag } from '../../../shared/models/tag';

@Component({
  selector: 'app-tag-ligne',
  standalone: true,
  imports: [TagAfficherComponent, TagEditerComponent],
  templateUrl: './tag-ligne.component.html',
  styleUrl: './tag-ligne.component.css',
})
export class TagLigneComponent {
  @Input() tag!: Tag;
  @Input() estPair!: boolean;
  @Input() estLectureSeule!: boolean;
  @Output() supprimerTag: EventEmitter<number> = new EventEmitter();
  @Output() modifierTag: EventEmitter<Tag> = new EventEmitter();
  estModif: boolean;

  constructor() {
    this.estModif = false;
  }

  lancerEdition(): void {
    this.estModif = true;
  }

  modifTagAnnulee() {
    this.estModif = false;
  }

  suppressionTag(id: number) {
    this.estModif = false;
    this.supprimerTag.emit(id);
  }

  modifTagTerminee(tagModifie: Tag) {
    this.modifierTag.emit(tagModifie);
    this.estModif = false;
  }
}
