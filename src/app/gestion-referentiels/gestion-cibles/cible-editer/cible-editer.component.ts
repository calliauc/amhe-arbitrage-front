import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ConfirmationModalComponent } from '../../../shared/confirmation-modal/confirmation-modal.component';
import { Cible } from '../../../shared/models/cible';
import { CiblesService } from '../../../shared/services/cibles.service';

@Component({
  selector: 'app-cible-editer',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, ConfirmationModalComponent],
  templateUrl: './cible-editer.component.html',
  styleUrl: './cible-editer.component.css',
})
export class CibleEditerComponent implements OnInit, AfterViewInit {
  @Input() cible: Cible = new Cible();
  @Input() estPair!: boolean;
  @Output() annulerEditionCreation: EventEmitter<boolean> = new EventEmitter();
  @Output() supprimerCible: EventEmitter<number> = new EventEmitter();
  @Output() validerEdition: EventEmitter<Cible> = new EventEmitter();
  @Output() validerCreation: EventEmitter<Cible> = new EventEmitter();
  @ViewChild('focus') focusForm!: ElementRef;

  ciblesListe!: Cible[];
  ereurSaisie: boolean;
  estModalVisible: boolean = false;
  titreModal: string = 'Confirmer la suppression ?';
  texteModal: string = 'Cette action est définitive';
  formEditerCible!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ciblesService: CiblesService
  ) {
    this.ereurSaisie = false;
  }

  ngOnInit(): void {
    this.formEditerCible = this.formBuilder.group({
      id: this.cible.id,
      code: this.cible.code,
      libelle: this.cible.libelle,
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

  confirmerSuppression(id: number) {
    this.estModalVisible = false;
    this.supprimerCible.emit(id);
  }

  annulerSuppression() {
    this.estModalVisible = false;
  }

  confirmer(): void {
    this.ereurSaisie = false;
    this.cible = this.formEditerCible.value;
    if (this.verifierCible(this.cible)) {
      this.enregistrer();
    } else {
      this.ereurSaisie = true;
      setTimeout(() => {
        this.ereurSaisie = false;
      }, 3000);
    }
  }

  enregistrer() {
    if (this.cible.id) {
      this.ciblesService.modifierCible(this.cible).subscribe((result) => {
        this.validerEdition.emit(result);
      });
    } else {
      this.ciblesService.creerCible(this.cible).subscribe((cibleCree) => {
        this.validerCreation.emit(cibleCree);
      });
    }
  }

  verifierCible(cible: Cible): boolean {
    return !!cible.code && !!cible.libelle;
  }
}
