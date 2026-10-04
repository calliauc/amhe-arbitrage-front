import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CibleAfficherComponent } from '../cible-afficher/cible-afficher.component';
import { CibleEditerComponent } from '../cible-editer/cible-editer.component';
import { RulesetRef } from '../../../shared/models/ruleset-ref';

@Component({
    selector: 'app-cible-ligne',
    imports: [CibleAfficherComponent, CibleEditerComponent],
    templateUrl: './cible-ligne.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './cible-ligne.component.css'
})
export class CibleLigneComponent {
  @Input() cible!: RulesetRef;
  @Input() estPair!: boolean;
  @Input() estLog!: boolean;
  @Output() supprimerCible = new EventEmitter<string>();
  @Output() modifierCible = new EventEmitter<RulesetRef>();
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
