import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject, ChangeDetectionStrategy } from '@angular/core';
import { Inscrit } from '../../shared/models/inscrit';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Club } from '../../shared/models/club';
import { ClubsService } from '../../shared/services/clubs.service';
import { InscritsService } from '../../shared/services/inscrits.service';
import { ConfirmationModalComponent } from '../../shared/modales/confirmation-modal/confirmation-modal.component';
import { IndividuService } from '../../shared/services/individus.service';
import { Individu } from '../../shared/models/individu';
import { NguiAutoCompleteDirective } from '@ngui/auto-complete';
import { Evenement } from '../../shared/models/evenement';
import { EvenementsService } from '../../shared/services/evenements.service';

@Component({
    selector: 'app-inscription',
    imports: [
      ReactiveFormsModule,
      NguiAutoCompleteDirective,
      ConfirmationModalComponent
    ],
    templateUrl: './inscription.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './inscription.component.css'
})
export class InscriptionComponent implements OnInit, AfterViewInit {
  private formBuilder = inject(FormBuilder);
  private clubsService = inject(ClubsService);
  private individuService = inject(IndividuService);
  private evenementService = inject(EvenementsService);

  @Input() inscrit: Inscrit = new Inscrit();
  @Output() annulerEditionCreation = new EventEmitter<boolean>();
  @Output() supprimerInscrit = new EventEmitter<number>();
  @Output() validerCreation = new EventEmitter<null>();
  @ViewChild('focus') focusForm!: ElementRef;

  clubsListe!: Club[];
  individusListe!: Individu[];
  individuAInscrire: Individu = new Individu;
  evenement!: Evenement;
  ereurSaisie: boolean;
  estModalVisible = false;
  titreModal = 'Confirmer la suppression ?';
  texteModal = 'Cette action est définitive';
  formInscription!: FormGroup;

  constructor() {
    this.evenement = JSON.parse(localStorage.getItem('event') || "{\"id\":0}") as Evenement;
    this.ereurSaisie = false;
  }

  ngOnInit(): void {
    this.recupererIndividus();
    this.recupererClubs();
    this.initFormInscription();
  }

  ngAfterViewInit(): void {
    this.focusForm.nativeElement.focus();
  }

  recupererIndividus(){
    const idsInscrits = this.evenement.inscrits?.map(inscrit => inscrit.idIndividu) || [];
    this.individuService
      .getIndividus()
      .subscribe((individus) => this.individusListe = individus.filter(ind => !idsInscrits?.includes(ind.id as number)));
  }

  recupererClubs(){
    this.clubsService
    .getClubs()
    .subscribe((clubs) => this.clubsListe = clubs);
  }

  initFormInscription(){
    this.formInscription = this.formBuilder.group({
      selectionIndividu: null,
    });
    this.formInscription.controls['selectionIndividu'].valueChanges.subscribe((individu) => {
      this.individuAInscrire = individu;
    });
  }

  afficheIndividu(item: Individu): string {
    return `${item.prenom} ${item.nom}`;
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
    this.inscrit = this.formInscription.value;
    if (this.individuAInscrire.id
      && this.evenement.inscrits
      && this.verifierInscription(this.individuAInscrire)
    ) {
      this.evenementService
      .inscrire(this.evenement.id, this.individuAInscrire.id)
      .subscribe((evenement) => {
        localStorage.setItem('event', JSON.stringify(evenement))
        this.validerCreation.emit()
      });
    } else {
      this.ereurSaisie = true;
      setTimeout(() => {
        this.ereurSaisie = false;
      }, 3000);
    }
  }


  verifierInscription(individu: Individu): boolean {
    this.ereurSaisie = this.evenement.inscrits!.filter(inscrit => inscrit.idIndividu === individu.id).length != 0;
    return !this.ereurSaisie;
  }
}
