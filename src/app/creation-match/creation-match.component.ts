import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Match } from '../shared/models/match';
import { MatchsService } from '../shared/services/matchs.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CombattantsService } from '../shared/services/combattants.service';
import { Combattant } from '../shared/models/combattant';
import { NomsPipe } from '../shared/pipes/noms.pipe';
import { NouveauMatch } from '../shared/models/nouveau-match';
import { Ruleset } from '../shared/models/ruleset';
import { RulesetsService } from '../shared/services/rulesets.service';
import { CommonModule } from '@angular/common';
import { TimerPipe } from '../shared/pipes/timer.pipe';
import { RulsetRefPipe } from '../shared/pipes/ruleset-refs.pipe';
import { TimerReversePipe } from '../shared/pipes/timerReverse.pipe';
import { couleurs } from '../shared/models/ruleset-ref';
import { CreationMatchModalComponent } from './creation-match-modal/creation-match-modal.component';

@Component({
  selector: 'app-creation-match',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NomsPipe,
    TimerPipe,
    RulsetRefPipe,
    TimerReversePipe,
    CreationMatchModalComponent,
  ],
  templateUrl: './creation-match.component.html',
  styleUrl: './creation-match.component.css',
})
export class CreationMatchComponent implements OnInit {
  estModalVisible: boolean = false;
  nouveauMatch?: NouveauMatch;
  formCreerMatch!: FormGroup;
  combattantsListe!: Combattant[];
  rulesets?: Ruleset[];
  rulesetChoisi?: Ruleset;
  a?: Combattant;
  b?: Combattant;
  colorA?: string;
  colorB?: string;
  rechercheCombattantA?: string;
  couleurs = couleurs;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private matchsService: MatchsService,
    private combattantsService: CombattantsService,
    private rulesetsService: RulesetsService
  ) {}

  ngOnInit(): void {
    this.getDatas();
    this.initForm();
  }

  getDatas() {
    this.combattantsService.getCombattants().subscribe((liste) => {
      this.combattantsListe = liste;
    });
    this.rulesetsService.getRulesets().subscribe((rulesets) => {
      this.rulesets = rulesets;
    });
  }

  initForm() {
    this.rulesetChoisi = undefined;
    this.a = undefined;
    this.b = undefined;
    this.colorA = undefined;
    this.colorB = undefined;

    this.formCreerMatch = this.formBuilder.group({
      combattantA: null,
      combattantB: null,
      couleurA: 'white',
      couleurB: 'white',
      ruleset: null,
    });
    this.formCreerMatch.valueChanges.subscribe((values) => {
      console.log(values);
      this.rulesetChoisi = values.ruleset;
      this.a = this.combattantsListe.find((c) => c.id === values.combattantA);
      this.b = this.combattantsListe.find((c) => c.id === values.combattantB);
      this.colorA = values.couleurA;
      this.colorB = values.couleurB;
    });
  }

  creerMatch() {
    if (this.estIncomplet()) {
      alert('Certains champs sont incomplets');
    } else if (this.estIncorrect()) {
      alert('Les champs sont mal remplis');
    } else {
      this.nouveauMatch = new NouveauMatch(
        this.formCreerMatch.value.combattantA,
        this.formCreerMatch.value.combattantB,
        this.formCreerMatch.value.couleurA,
        this.formCreerMatch.value.couleurB,
        0,
        this.setRuleset()
      );
      this.nouveauMatch = this.setTimer(this.nouveauMatch);
      console.log(this.nouveauMatch);
      this.estModalVisible = true;
    }
  }

  estIncomplet(): boolean {
    return !(
      this.formCreerMatch.value.combattantA &&
      this.formCreerMatch.value.combattantB &&
      this.formCreerMatch.value.couleurA &&
      this.formCreerMatch.value.couleurB &&
      this.rulesetChoisi
    );
  }

  estIncorrect(): boolean {
    return (
      this.formCreerMatch.value.combattantA ===
        this.formCreerMatch.value.combattantB ||
      this.formCreerMatch.value.couleurA === this.formCreerMatch.value.couleurB
    );
  }

  setRuleset(): Ruleset {
    let vulnerants = this.rulesetChoisi!.vulnerants;
    let cibles = this.rulesetChoisi!.cibles;
    return {
      id: this.rulesetChoisi!.id,
      nom: this.rulesetChoisi!.nom,
      description: this.rulesetChoisi!.description,
      timerLimite: this.rulesetChoisi!.timerLimite,
      timerReverse: this.rulesetChoisi!.timerReverse,
      vulnerants: vulnerants,
      cibles: cibles,
    } as Ruleset;
  }

  setTimer(match: NouveauMatch): NouveauMatch {
    if (this.rulesetChoisi!.timerReverse) {
      match.timer = match.ruleset.timerLimite!;
      match.ruleset.timerLimite = 0;
    }
    return match;
  }

  annulerCreation() {
    this.estModalVisible = false;
  }

  confirmerCreation(suite: string) {
    this.matchsService
      .creerMatch(this.nouveauMatch!)
      .subscribe((matchCree: Match) => {
        this.estModalVisible = false;
        switch (suite) {
          case 'liste':
            this.router.navigate(['matchs']);
            break;
          case 'arbitrer':
            this.router.navigate(['arbitrage', matchCree.id]);
            break;
          case 'rester':
            this.initForm();
            break;
        }
      });
  }
}
