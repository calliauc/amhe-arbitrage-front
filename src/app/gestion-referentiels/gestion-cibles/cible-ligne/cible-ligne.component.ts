import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CibleAfficherComponent } from '../cible-afficher/cible-afficher.component';
import { CibleEditerComponent } from '../cible-editer/cible-editer.component';
import { RulesetRef } from '../../../shared/models/ruleset-ref';

@Component({
  selector: 'app-cible-ligne',
  standalone: true,
  imports: [CibleAfficherComponent, CibleEditerComponent],
  templateUrl: './cible-ligne.component.html',
  styleUrl: './cible-ligne.component.css',
})
export class CibleLigneComponent {
  @Input() cible!: RulesetRef;
  @Input() estPair!: boolean;
  @Input() estLectureSeule!: boolean;
  @Output() supprimerCible: EventEmitter<string> = new EventEmitter();
  @Output() modifierCible: EventEmitter<RulesetRef> = new EventEmitter();
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

  suppressionCible(code: string) {
    this.estModif = false;
    this.supprimerCible.emit(code);
  }

  modifCibleTerminee(cibleModifie: RulesetRef) {
    this.modifierCible.emit(cibleModifie);
    this.estModif = false;
  }
}
