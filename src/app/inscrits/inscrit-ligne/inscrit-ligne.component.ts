import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Inscrit } from '../../shared/models/inscrit';
import { InscritAfficherComponent } from '../inscrit-afficher/inscrit-afficher.component';
import { InscritEditerComponent } from '../inscrit-editer/inscrit-editer.component';
import { RolesNames } from '../../shared/models/roles';

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
  @Input() role!: RolesNames;
  @Input() estModif!: boolean;
  @Output() supprimerInscrit = new EventEmitter<number>();
  @Output() modifierInscrit = new EventEmitter<Inscrit>();

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

  modificationInscrit(inscrit: Inscrit) {
    this.estModif = false;
    this.modifierInscrit.emit(inscrit);
  }

  suppressionInscrit(id: number) {
    this.estModif = false;
    this.supprimerInscrit.emit(id);
  }
}
