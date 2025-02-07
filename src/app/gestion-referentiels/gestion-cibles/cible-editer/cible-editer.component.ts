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
import { ConfirmationModalComponent } from '../../../shared/modales/confirmation-modal/confirmation-modal.component';
import { CiblesService } from '../../../shared/services/cibles.service';
import { RulesetRef } from '../../../shared/models/ruleset-ref';

@Component({
  selector: 'app-cible-editer',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, ConfirmationModalComponent],
  templateUrl: './cible-editer.component.html',
  styleUrl: './cible-editer.component.css',
})
export class CibleEditerComponent implements OnInit, AfterViewInit {
  @Input() cible: RulesetRef = new RulesetRef();
  @Input() estPair!: boolean;
  @Input() estModeEdition: boolean = false;
  @Output() annulerEditionCreation: EventEmitter<boolean> = new EventEmitter();
  @Output() supprimerCible: EventEmitter<string> = new EventEmitter();
  @Output() validerEdition: EventEmitter<RulesetRef> = new EventEmitter();
  @Output() validerCreation: EventEmitter<RulesetRef> = new EventEmitter();
  @ViewChild('focus') focusForm!: ElementRef;

  ciblesListe!: RulesetRef[];
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

  confirmerSuppression(code: string | number) {
    this.estModalVisible = false;
    this.supprimerCible.emit(code as string);
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
    if (this.estModeEdition) {
      this.ciblesService.modifierCible(this.cible).subscribe((result) => {
        this.validerEdition.emit(result);
      });
    } else {
      this.ciblesService.creerCible(this.cible).subscribe((cibleCree) => {
        this.validerCreation.emit(cibleCree);
      });
    }
  }

  verifierCible(cible: RulesetRef): boolean {
    return !!cible.code && !!cible.libelle;
  }
}
