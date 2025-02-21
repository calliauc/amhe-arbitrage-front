import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  viewChild,
} from '@angular/core';
import { Combattant } from '../../shared/models/combattant';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Club } from '../../shared/models/club';
import { ClubsService } from '../../shared/services/clubs.service';
import { CombattantsService } from '../../shared/services/combattants.service';
import { ConfirmationModalComponent } from '../../shared/modales/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-combattant-editer',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, ConfirmationModalComponent],
  templateUrl: './combattant-editer.component.html',
  styleUrl: './combattant-editer.component.css',
})
export class CombattantEditerComponent implements OnInit, AfterViewInit {
  @Input() combattant: Combattant = new Combattant();
  @Input() estPair!: boolean;
  @Output() annulerEditionCreation: EventEmitter<boolean> = new EventEmitter();
  @Output() supprimerCombattant: EventEmitter<number> = new EventEmitter();
  @Output() validerEdition: EventEmitter<Combattant> = new EventEmitter();
  @Output() validerCreation: EventEmitter<Combattant> = new EventEmitter();
  @ViewChild('focus') focusForm!: ElementRef;

  clubsListe!: Club[];
  ereurSaisie: boolean;
  estModalVisible: boolean = false;
  titreModal: string = 'Confirmer la suppression ?';
  texteModal: string = 'Cette action est définitive';
  formEditerCombattant!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private combattantsService: CombattantsService,
    private clubsService: ClubsService
  ) {
    this.ereurSaisie = false;
  }

  ngOnInit(): void {
    this.clubsService
      .getClubs()
      .subscribe((clubs) => (this.clubsListe = clubs));
    this.formEditerCombattant = this.formBuilder.group({
      id: this.combattant.id,
      prenom: this.combattant.prenom,
      nom: this.combattant.nom,
      pseudo: this.combattant.pseudo,
      club: this.combattant.club,
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
    this.supprimerCombattant.emit(id as number);
  }

  annulerSuppression() {
    this.estModalVisible = false;
  }

  confirmer(): void {
    this.ereurSaisie = false;
    this.combattant = this.formEditerCombattant.value;
    if (this.verifierCombattant(this.combattant)) {
      this.enregistrer();
    } else {
      this.ereurSaisie = true;
      setTimeout(() => {
        this.ereurSaisie = false;
      }, 3000);
    }
  }

  enregistrer() {
    if (this.combattant.id) {
      this.combattantsService
        .modifierCombattant(this.combattant)
        .subscribe((result) => {
          this.validerEdition.emit(result);
        });
    } else {
      this.combattantsService
        .creerCombattant(this.combattant)
        .subscribe((combattantCree) => {
          this.validerCreation.emit(combattantCree);
        });
    }
  }

  verifierCombattant(combattant: Combattant): boolean {
    return !!combattant.prenom && !!combattant.nom;
  }
}
