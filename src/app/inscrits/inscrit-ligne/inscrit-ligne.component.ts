import { Inscrit } from '../../shared/models/inscrit';
import { NgClass } from '@angular/common';
import { ConfirmationModalComponent } from '../../shared/modales/confirmation-modal/confirmation-modal.component';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RolesNames } from '../../shared/models/roles';
import { Router } from '@angular/router';

@Component({
    selector: 'app-inscrit-ligne',
    imports: [NgClass, ConfirmationModalComponent],
    templateUrl: './inscrit-ligne.component.html',
    styleUrl: './inscrit-ligne.component.css'
})
export class InscritLigneComponent {
  private router = inject(Router);

  @Input() inscrit: Inscrit = new Inscrit();
  @Input() estPair!: boolean;
  @Input() estModeModif!: boolean;
  @Output() modifierInscrit = new EventEmitter<Inscrit>();
  @Output() supprimerInscrit = new EventEmitter<number>();
  @Output() annulerEdition = new EventEmitter<boolean>();

  estModalVisible = false;
  titreModal = 'Confirmer la suppression ?';
  texteModal = 'Cette action est définitive';

  details(){
    console.log("Go ", this.inscrit.prenom);
    
    this.router.navigate(['inscrit', this.inscrit.id]);
  }

  desinscrire(){
    this.inscrit.estDesinscrit=true;
    this.enregistrerInscrit();
  }

  resinscrire(){
    this.inscrit.estDesinscrit=false;
    this.enregistrerInscrit();
  }

  enAttente(){
    this.inscrit.estListeAttente=true;
    this.enregistrerInscrit();
  }

  sortirAttente(){
    this.inscrit.estListeAttente=false;
    this.enregistrerInscrit();
  }

  enregistrerInscrit(): void{
    this.modifierInscrit.emit(this.inscrit);
  }

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
