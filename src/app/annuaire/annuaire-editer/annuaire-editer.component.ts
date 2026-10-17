import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject, ChangeDetectionStrategy } from '@angular/core';
import { Individu } from '../../shared/models/individu';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Club } from '../../shared/models/club';
import { ClubsService } from '../../shared/services/clubs.service';
import { IndividuService } from '../../shared/services/individus.service';
import { ConfirmationModalComponent } from '../../shared/modales/confirmation-modal/confirmation-modal.component';

@Component({
    selector: 'app-annuaire-editer',
    imports: [ReactiveFormsModule, NgClass, ConfirmationModalComponent],
    templateUrl: './annuaire-editer.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './annuaire-editer.component.css'
})
export class AnnuaireEditerComponent implements OnInit, AfterViewInit {
  private formBuilder = inject(FormBuilder);
  private individuService = inject(IndividuService);
  private clubsService = inject(ClubsService);

  @Input() individu: Individu = new Individu();
  @Input() estPair!: boolean;
  @Output() annulerEditionCreation = new EventEmitter<boolean>();
  @Output() supprimerIndividu = new EventEmitter<number>();
  @Output() validerEdition = new EventEmitter<Individu>();
  @Output() validerCreation = new EventEmitter<Individu>();
  @ViewChild('focus') focusForm!: ElementRef;

  clubsListe!: Club[];
  ereurSaisie: boolean;
  estModalVisible = false;
  titreModal = 'Confirmer la suppression ?';
  texteModal = 'Cette action est définitive';
  formEditerIndividu!: FormGroup;

  constructor() {
    this.ereurSaisie = false;
  }

  ngOnInit(): void {
    this.clubsService
      .getClubs()
      .subscribe((clubs) => (this.clubsListe = clubs));
    this.formEditerIndividu = this.formBuilder.group({
      id: this.individu.id,
      prenom: this.individu.prenom,
      nom: this.individu.nom,
      pseudo: this.individu.pseudo,
      club: this.individu.club,
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
    this.supprimerIndividu.emit(id as number);
  }

  annulerSuppression() {
    this.estModalVisible = false;
  }

  confirmer(): void {
    this.ereurSaisie = false;
    this.individu = this.formEditerIndividu.value;
    if (this.verifierIndividu(this.individu)) {
      this.enregistrer();
    } else {
      this.ereurSaisie = true;
      setTimeout(() => {
        this.ereurSaisie = false;
      }, 3000);
    }
  }

  enregistrer() {
    if (this.individu.id) {
      this.individuService
        .modifierIndividu(this.individu)
        .subscribe((result) => {
          this.validerEdition.emit(result);
        });
    } else {
      this.individuService
        .creerIndividu(this.individu)
        .subscribe((individuCree) => {
          this.validerCreation.emit(individuCree);
        });
    }
  }

  verifierIndividu(individu: Individu): boolean {
    return !!individu.prenom && !!individu.nom;
  }
}
