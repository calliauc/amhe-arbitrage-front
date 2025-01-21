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
  ],
  templateUrl: './creation-match.component.html',
  styleUrl: './creation-match.component.css',
})
export class CreationMatchComponent implements OnInit {
  formCreerMatch!: FormGroup;
  formRuleset!: FormGroup;
  combattantsListe!: Combattant[];
  rulesets?: Ruleset[];
  rulesetChoisi?: Ruleset;
  couleurs = couleurs;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private matchsService: MatchsService,
    private combattantsService: CombattantsService,
    private rulesetsService: RulesetsService
  ) {}

  ngOnInit(): void {
    this.combattantsService.getCombattants().subscribe((liste) => {
      this.combattantsListe = liste;
    });
    this.formCreerMatch = this.formBuilder.group({
      combattantA: null,
      combattantB: null,
      couleurA: null,
      couleurB: null,
    });
    this.initRuleset();
  }

  initRuleset() {
    this.rulesetsService.getRulesets().subscribe((rulesets) => {
      this.rulesets = rulesets;
    });
    this.formRuleset = this.formBuilder.group({
      ruleset: null,
    });
    this.formRuleset.valueChanges.subscribe((ruleset) => {
      this.rulesetChoisi = ruleset.ruleset;
    });
  }

  creerMatch() {
    if (this.estIncomplet()) {
      alert('Certains champs sont incomplets');
    } else if (this.estIncorrect()) {
      alert('Les champs sont mal remplis');
    } else {
      let nouveauMatch = new NouveauMatch(
        this.formCreerMatch.value.combattantA,
        this.formCreerMatch.value.combattantB,
        this.formCreerMatch.value.couleurA,
        this.formCreerMatch.value.couleurB,
        this.setRuleset()
      );
      console.log(nouveauMatch);

      this.matchsService
        .creerMatch(nouveauMatch)
        .subscribe((matchCree: Match) => {
          this.router.navigate(['arbitrage', matchCree.id]);
        });
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
}
