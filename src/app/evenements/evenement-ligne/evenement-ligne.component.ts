import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Evenement } from '../../shared/models/evenement';
import { EvenementAfficherComponent } from '../evenement-afficher/evenement-afficher.component';
import { EvenementEditerComponent } from '../evenement-editer/evenement-editer.component';
import { RolesNames } from '../../shared/models/roles';

@Component({
    selector: 'app-evenement-ligne',
    imports: [EvenementAfficherComponent, EvenementEditerComponent],
    templateUrl: './evenement-ligne.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './evenement-ligne.component.css'
})
export class EvenementLigneComponent {
  @Input() evenement!: Evenement;
  @Input() estPair!: boolean;
  @Input() role!: RolesNames;
  @Output() supprimerEvenement = new EventEmitter<number>();
  @Output() modifierEvenement = new EventEmitter<Evenement>();
  estModif: boolean;

  constructor() {
    this.estModif = false;
  }

  lancerEdition(): void {
    this.estModif = true;
  }

  modifEvenementAnnulee() {
    this.estModif = false;
  }

  suppressionEvenement(id: number) {
    this.estModif = false;
    this.supprimerEvenement.emit(id);
  }

  modifEvenementTerminee(evenementModifie: Evenement) {
    this.modifierEvenement.emit(evenementModifie);
    this.estModif = false;
  }
}
