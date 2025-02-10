import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Combattant } from '../../shared/models/combattant';
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
  @Input() estLectureSeule!: boolean;
  @Output() supprimerCombattant: EventEmitter<number> = new EventEmitter();
  @Output() modifierCombattant: EventEmitter<Combattant> = new EventEmitter();
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

  suppressionCombattant(id: number) {
    this.estModif = false;
    this.supprimerCombattant.emit(id);
  }

  modifCombattantTerminee(combattantModifie: Combattant) {
    this.modifierCombattant.emit(combattantModifie);
    this.estModif = false;
  }
}
