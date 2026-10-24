import { Inscrit } from '../../shared/models/inscrit';
import { NgClass } from '@angular/common';
import { ConfirmationModalComponent } from '../../shared/modales/confirmation-modal/confirmation-modal.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-inscrit-editer',
    imports: [NgClass, ConfirmationModalComponent],
    templateUrl: './inscrit-editer.component.html',
    styleUrl: './inscrit-editer.component.css'
})
export class InscritEditerComponent {
  @Input() inscrit: Inscrit = new Inscrit();
  @Input() estPair!: boolean;
  @Output() supprimerInscrit = new EventEmitter<number>();
  @Output() annulerEdition = new EventEmitter<boolean>();

  estModalVisible = false;
  titreModal = 'Confirmer la suppression ?';
  texteModal = 'Cette action est définitive';

  annuler(): void {
    this.annulerEdition.emit(true);
  }
  demanderSuppression(): void {
    this.estModalVisible = true;
  }

  confirmerSuppression(id: number | string) {
    this.estModalVisible = false;
    this.supprimerInscrit.emit(id as number);
  }

  annulerSuppression() {
    this.estModalVisible = false;
  }

}
