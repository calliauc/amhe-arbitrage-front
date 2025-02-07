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
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { ConfirmationModalComponent } from '../../../shared/modales/confirmation-modal/confirmation-modal.component';
import { Ruleset } from '../../../shared/models/ruleset';
import { RulesetsService } from '../../../shared/services/rulesets.service';
import { RulesetRef } from '../../../shared/models/ruleset-ref';
import { VulnerantsService } from '../../../shared/services/vulnerants.service';
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

  ereurSaisie: boolean;
  estModalVisible: boolean = false;
  estListeVulnerantsVisible: boolean = false;
  estListeCiblesVisible: boolean = false;
  titreModal: string = 'Confirmer la suppression ?';
  texteModal: string = 'Cette action est définitive';
  formEditerRuleset!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private rulesetsService: RulesetsService,
    private vulnerantsService: VulnerantsService,
    private ciblesService: CiblesService
  ) {
    this.ereurSaisie = false;
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit(): void {
    this.focusForm.nativeElement.focus();
  }

  initForm() {
    this.formEditerRuleset = this.formBuilder.group({
      id: this.ruleset.id,
      nom: this.ruleset.nom,
      description: this.ruleset.description,
      timerLimite: this.ruleset.timerLimite,
      timerReverse: this.ruleset.timerReverse,
      vulnerants: new FormArray([]),
      cibles: new FormArray([]),
    });
    this.initVulnerantsForm();
    this.initCiblesForm();
  }

  initVulnerantsForm() {
    if (!this.ruleset.id) {
      this.vulnerantsService.getVulnerants().subscribe((vs) => {
        vs.forEach((v) => {
          let ref = {
            code: v.code,
            libelle: v.libelle,
            checked: false,
          } as RulesetRef;
          this.ruleset.vulnerants?.push(ref);
        });
      });
      //TODO récupérer liste vierge des vulnerants
    }
    const formVulnerants = this.formEditerRuleset.get(
      'vulnerants'
    ) as FormArray;
    this.ruleset?.vulnerants?.forEach((vulnerant) => {
      formVulnerants.push(
        new FormGroup({
          code: new FormControl(vulnerant.code),
          checked: new FormControl(vulnerant.checked),
        })
      );
    });
  }

  initCiblesForm() {
    if (!this.ruleset.id) {
      this.ciblesService.getCibles().subscribe((cs) => {
        cs.forEach((c) => {
          let ref = {
            code: c.code,
            libelle: c.libelle,
            checked: false,
          } as RulesetRef;
          this.ruleset.cibles?.push(ref);
        });
      });
      //TODO récupérer liste vierge des cibles
    }
    const formCibles = this.formEditerRuleset.get('cibles') as FormArray;
    this.ruleset?.cibles?.forEach((cible) => {
      formCibles.push(
        new FormGroup({
          code: new FormControl(cible.code),
          checked: new FormControl(cible.checked),
        })
      );
    });
  }

  showVulnerants() {
    this.estListeVulnerantsVisible = !this.estListeVulnerantsVisible;
  }

  showCibles() {
    this.estListeCiblesVisible = !this.estListeCiblesVisible;
  }

  annuler(): void {
    this.annulerEditionCreation.emit(true);
  }

  demanderSuppression(): void {
    this.estModalVisible = true;
  }

  confirmerSuppression(id: number | string) {
    this.estModalVisible = false;
    this.supprimerRuleset.emit(id as number);
  }

  annulerSuppression() {
    this.estModalVisible = false;
  }

  confirmer(): void {
    // TODO vérifier checked
    this.ereurSaisie = false;
    this.ruleset = this.formEditerRuleset.value;
    // this.ruleset.timerLimite = this.convertirTemps(
    //   this.formEditerRuleset.value.timerLimite
    // );

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
      console.log('Envoi : ', this.ruleset);
      this.rulesetsService.modifierRuleset(this.ruleset).subscribe((result) => {
        console.log('resultat : ', result);
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

  // convertirTemps(temps: string): number {
  //   if (temps) {
  //     let valuesTemps: string[] = temps.split(':');
  //     let minutes = Number(valuesTemps[0]);
  //     let secondes = Number(valuesTemps[1]);
  //     return minutes * 60 + secondes;
  //   }
  //   return 0;
  // }

  verifierRuleset(ruleset: Ruleset): boolean {
    return true || ruleset.nom;
  }
}
