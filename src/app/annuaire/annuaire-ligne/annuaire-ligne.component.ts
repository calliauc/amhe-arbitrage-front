import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Individu } from '../../shared/models/individu';
import { AnnuaireAfficherComponent } from '../annuaire-afficher/annuaire-afficher.component';
import { AnnuaireEditerComponent } from '../annuaire-editer/annuaire-editer.component';

@Component({
    selector: 'app-annuaire-ligne',
    imports: [AnnuaireAfficherComponent, AnnuaireEditerComponent],
    templateUrl: './annuaire-ligne.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './annuaire-ligne.component.css'
})
export class AnnuaireLigneComponent {
  @Input() individu!: Individu;
  @Input() estPair!: boolean;
  @Input() estLog!: boolean;
  @Output() supprimerIndividu = new EventEmitter<number>();
  @Output() modifierIndividu = new EventEmitter<Individu>();
  estModif: boolean;

  constructor() {
    this.estModif = false;
  }

  lancerEdition(): void {
    this.estModif = true;
  }

  modifIndividuAnnulee() {
    this.estModif = false;
  }

  suppressionIndividu(id: number) {
    this.estModif = false;
    this.supprimerIndividu.emit(id);
  }

  modifIndividuTerminee(individuModifie: Individu) {
    this.modifierIndividu.emit(individuModifie);
    this.estModif = false;
  }
}
