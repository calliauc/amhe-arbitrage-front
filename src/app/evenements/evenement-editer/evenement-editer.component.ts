import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject, ChangeDetectionStrategy } from '@angular/core';
import { Evenement } from '../../shared/models/evenement';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Club } from '../../shared/models/club';
import { ClubsService } from '../../shared/services/clubs.service';
import { EvenementsService } from '../../shared/services/evenements.service';
import { ConfirmationModalComponent } from '../../shared/modales/confirmation-modal/confirmation-modal.component';
import { Ruleset } from '../../shared/models/ruleset';
import { RulesetsService } from '../../shared/services/rulesets.service';

@Component({
    selector: 'app-evenement-editer',
    imports: [ReactiveFormsModule, NgClass, ConfirmationModalComponent],
    templateUrl: './evenement-editer.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './evenement-editer.component.css'
})
export class EvenementEditerComponent implements OnInit, AfterViewInit {
  private formBuilder = inject(FormBuilder);
  private evenementsService = inject(EvenementsService);
  private rulesetService = inject(RulesetsService);

  @Input() evenement: Evenement = new Evenement();
  @Input() estPair!: boolean;
  @Output() annulerEditionCreation = new EventEmitter<boolean>();
  @Output() supprimerEvenement = new EventEmitter<number>();
  @Output() validerEdition = new EventEmitter<Evenement>();
  @Output() validerCreation = new EventEmitter<Evenement>();
  @ViewChild('focus') focusForm!: ElementRef;

  rulesetListe!: Ruleset[];
  ereurSaisie: boolean;
  estModalVisible = false;
  titreModal = 'Confirmer la suppression ?';
  texteModal = 'Cette action est définitive';
  formEditerEvenement!: FormGroup;

  constructor() {
    this.ereurSaisie = false;
  }

  ngOnInit(): void {
    this.rulesetService.getRulesets().subscribe(rulesets => this.rulesetListe = rulesets);
    console.log(this.evenement);
    
    this.formEditerEvenement = this.formBuilder.group({
      id: this.evenement.id,
      nom: this.evenement.nom,
      description: this.evenement.description,
      dateDebut: this.evenement.dateDebut,
      dateFin: this.evenement.dateFin,
      ruleset: this.evenement.ruleset
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
    this.supprimerEvenement.emit(id as number);
  }

  annulerSuppression() {
    this.estModalVisible = false;
  }

  confirmer(): void {
    this.ereurSaisie = false;
    this.evenement = {...this.formEditerEvenement.value};
    console.log(this.evenement);
    
    if (this.verifierEvenement(this.evenement)) {
      this.enregistrer();
    } else {
      this.ereurSaisie = true;
      setTimeout(() => {
        this.ereurSaisie = false;
      }, 3000);
    }
  }

  enregistrer() {
    if (this.evenement.id) {
      this.evenementsService
        .modifierEvenement(this.evenement)
        .subscribe((result) => {
          this.validerEdition.emit(result);
        });
    } else {
      this.evenementsService
        .creerEvenement(this.evenement)
        .subscribe((evenementCree) => {
          this.validerCreation.emit(evenementCree);
        });
    }
  }

  verifierEvenement(evenement: Evenement): boolean {
    return !!evenement.nom;
  }
}
