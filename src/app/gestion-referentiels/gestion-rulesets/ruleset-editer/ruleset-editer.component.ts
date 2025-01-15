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
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ConfirmationModalComponent } from '../../../shared/confirmation-modal/confirmation-modal.component';
import { Ruleset } from '../../../shared/models/ruleset';
import { RulesetsService } from '../../../shared/services/rulesets.service';
import { Cible } from '../../../shared/models/cible';
import { CiblesService } from '../../../shared/services/cibles.service';

@Component({
  selector: 'app-ruleset-editer',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, ConfirmationModalComponent],
  templateUrl: './ruleset-editer.component.html',
  styleUrl: './ruleset-editer.component.css',
})
export class RulesetEditerComponent implements OnInit, AfterViewInit {
  @Input() ruleset: Ruleset = new Ruleset();
  @Input() estPair!: boolean;
  @Output() annulerEditionCreation: EventEmitter<boolean> = new EventEmitter();
  @Output() supprimerRuleset: EventEmitter<number> = new EventEmitter();
  @Output() validerEdition: EventEmitter<Ruleset> = new EventEmitter();
  @Output() validerCreation: EventEmitter<Ruleset> = new EventEmitter();
  @ViewChild('focus') focusForm!: ElementRef;

  ciblesListe!: Cible[];
  ereurSaisie: boolean;
  estModalVisible: boolean = false;
  titreModal: string = 'Confirmer la suppression ?';
  texteModal: string = 'Cette action est définitive';
  formEditerRuleset!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private rulesetsService: RulesetsService,
    private ciblesService: CiblesService
  ) {
    this.ereurSaisie = false;
  }

  ngOnInit(): void {
    this.ciblesService
      .getCibles()
      .subscribe((cibles) => (this.ciblesListe = cibles));
    this.formEditerRuleset = this.formBuilder.group({
      id: this.ruleset.id,
      nom: this.ruleset.nom,
      description: this.ruleset.description,
      timerStart: this.ruleset.timerStart,
      cibles: this.ciblesListe,
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
    this.supprimerRuleset.emit(id);
  }

  annulerSuppression() {
    this.estModalVisible = false;
  }

  confirmer(): void {
    this.ereurSaisie = false;
    this.ruleset = this.formEditerRuleset.value;
    if (this.verifierRuleset(this.ruleset)) {
      this.enregistrer();
    } else {
      this.ereurSaisie = true;
      setTimeout(() => {
        this.ereurSaisie = false;
      }, 3000);
    }
  }

  enregistrer() {
    if (this.ruleset.id) {
      this.rulesetsService.modifierRuleset(this.ruleset).subscribe((result) => {
        this.validerEdition.emit(result);
      });
    } else {
      this.rulesetsService
        .creerRuleset(this.ruleset)
        .subscribe((rulesetCree) => {
          this.validerCreation.emit(rulesetCree);
        });
    }
  }

  verifierRuleset(ruleset: Ruleset): boolean {
    return !!ruleset.nom && !!ruleset.nom && !!ruleset.description;
  }
}
