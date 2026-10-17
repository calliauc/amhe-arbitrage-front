import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject, ChangeDetectionStrategy } from '@angular/core';
import { Inscrit } from '../../shared/models/inscrit';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Club } from '../../shared/models/club';
import { ClubsService } from '../../shared/services/clubs.service';
import { InscritsService } from '../../shared/services/inscrits.service';
import { ConfirmationModalComponent } from '../../shared/modales/confirmation-modal/confirmation-modal.component';

@Component({
    selector: 'app-inscrit-editer',
    imports: [ReactiveFormsModule, NgClass, ConfirmationModalComponent],
    templateUrl: './inscrit-editer.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './inscrit-editer.component.css'
})
export class InscritEditerComponent implements OnInit, AfterViewInit {
  private formBuilder = inject(FormBuilder);
  private inscritsService = inject(InscritsService);
  private clubsService = inject(ClubsService);

  @Input() inscrit: Inscrit = new Inscrit();
  @Input() estPair!: boolean;
  @Output() annulerEditionCreation = new EventEmitter<boolean>();
  @Output() supprimerInscrit = new EventEmitter<number>();
  @Output() validerEdition = new EventEmitter<Inscrit>();
  @Output() validerCreation = new EventEmitter<Inscrit>();
  @ViewChild('focus') focusForm!: ElementRef;

  clubsListe!: Club[];
  ereurSaisie: boolean;
  estModalVisible = false;
  titreModal = 'Confirmer la suppression ?';
  texteModal = 'Cette action est définitive';
  formEditerInscrit!: FormGroup;

  constructor() {
    this.ereurSaisie = false;
  }

  ngOnInit(): void {
    this.clubsService
      .getClubs()
      .subscribe((clubs) => (this.clubsListe = clubs));
    this.formEditerInscrit = this.formBuilder.group({
      id: this.inscrit.id,
      prenom: this.inscrit.prenom,
      nom: this.inscrit.nom,
      pseudo: this.inscrit.pseudo,
      club: this.inscrit.club,
    });
  }

  ngAfterViewInit(): void {
    this.focusForm.nativeElement.focus();
  }

  annuler(): void {
    this.annulerEditionCreation.emit(true);
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

  confirmer(): void {
    this.ereurSaisie = false;
    this.inscrit = this.formEditerInscrit.value;
    if (this.verifierInscrit(this.inscrit)) {
      this.enregistrer();
    } else {
      this.ereurSaisie = true;
      setTimeout(() => {
        this.ereurSaisie = false;
      }, 3000);
    }
  }

  enregistrer() {
    if (this.inscrit.id) {
      this.inscritsService
        .modifierInscrit(this.inscrit)
        .subscribe((result) => {
          this.validerEdition.emit(result);
        });
    } else {
      this.inscritsService
        .creerInscrit(this.inscrit)
        .subscribe((inscritCree) => {
          this.validerCreation.emit(inscritCree);
        });
    }
  }

  verifierInscrit(inscrit: Inscrit): boolean {
    return !!inscrit.prenom && !!inscrit.nom;
  }
}
