import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Inscrit } from '../../shared/models/inscrit';
import { InscritAfficherComponent } from '../inscrit-afficher/inscrit-afficher.component';
import { InscritEditerComponent } from '../inscrit-editer/inscrit-editer.component';

@Component({
    selector: 'app-inscrit-ligne',
    imports: [InscritAfficherComponent, InscritEditerComponent],
    templateUrl: './inscrit-ligne.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './inscrit-ligne.component.css'
})
export class InscritLigneComponent {
  @Input() inscrit!: Inscrit;
  @Input() estPair!: boolean;
  @Input() estLog!: boolean;
  @Output() supprimerInscrit = new EventEmitter<number>();
  @Output() modifierInscrit = new EventEmitter<Inscrit>();
  estModif: boolean;

  constructor() {
    this.estModif = false;
    console.log(this.inscrit);
    
  }

  lancerEdition(): void {
    this.estModif = true;
  }

  modifInscritAnnulee() {
    this.estModif = false;
  }

  suppressionInscrit(id: number) {
    this.estModif = false;
    this.supprimerInscrit.emit(id);
  }

  modifInscritTerminee(inscritModifie: Inscrit) {
    this.modifierInscrit.emit(inscritModifie);
    this.estModif = false;
  }
}
