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
import { VulnerantsService } from '../../../shared/services/vulnerants.service';
import { RulesetRef } from '../../../shared/models/ruleset-ref';

@Component({
  selector: 'app-vulnerant-editer',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, ConfirmationModalComponent],
  templateUrl: './vulnerant-editer.component.html',
  styleUrl: './vulnerant-editer.component.css',
})
export class VulnerantEditerComponent implements OnInit, AfterViewInit {
  @Input() vulnerant: RulesetRef = new RulesetRef();
  @Input() estPair!: boolean;
  @Input() estModeEdition: boolean = false;
  @Output() annulerEditionCreation: EventEmitter<boolean> = new EventEmitter();
  @Output() supprimerVulnerant: EventEmitter<string> = new EventEmitter();
  @Output() validerEdition: EventEmitter<RulesetRef> = new EventEmitter();
  @Output() validerCreation: EventEmitter<RulesetRef> = new EventEmitter();
  @ViewChild('focus') focusForm!: ElementRef;

  vulnerantsListe!: RulesetRef[];
  ereurSaisie: boolean;
  estModalVisible: boolean = false;
  titreModal: string = 'Confirmer la suppression ?';
  texteModal: string = 'Cette action est définitive';
  formEditerVulnerant!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private vulnerantsService: VulnerantsService
  ) {
    this.ereurSaisie = false;
  }

  ngOnInit(): void {
    this.formEditerVulnerant = this.formBuilder.group({
      code: this.vulnerant.code,
      libelle: this.vulnerant.libelle,
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
    this.supprimerVulnerant.emit(code as string);
  }

  annulerSuppression() {
    this.estModalVisible = false;
  }

  confirmer(): void {
    this.ereurSaisie = false;
    this.vulnerant = this.formEditerVulnerant.value;
    if (this.verifierVulnerant(this.vulnerant)) {
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
      this.vulnerantsService
        .modifierVulnerant(this.vulnerant)
        .subscribe((result) => {
          this.validerEdition.emit(result);
        });
    } else {
      this.vulnerantsService
        .creerVulnerant(this.vulnerant)
        .subscribe((vulnerantCree) => {
          this.validerCreation.emit(vulnerantCree);
        });
    }
  }

  verifierVulnerant(vulnerant: RulesetRef): boolean {
    return !!vulnerant.code && !!vulnerant.libelle;
  }
}
