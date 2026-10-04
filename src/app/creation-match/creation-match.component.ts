import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Match } from '../shared/models/match';
import { MatchsService } from '../shared/services/matchs.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CombattantsService } from '../shared/services/combattants.service';
import { Combattant } from '../shared/models/combattant';
import { NouveauMatch } from '../shared/models/nouveau-match';
import { Ruleset } from '../shared/models/ruleset';
import { RulesetsService } from '../shared/services/rulesets.service';

import { couleurs } from '../shared/models/ruleset-ref';
import { CreationMatchModalComponent } from './creation-match-modal/creation-match-modal.component';
import { TagCb } from '../shared/models/tag';
import { TagsService } from '../shared/services/tags.service';
import { NguiAutoCompleteDirective } from '@ngui/auto-complete';
import { LogService } from '../shared/services/log.service';

@Component({
    selector: 'app-creation-match',
    imports: [
    ReactiveFormsModule,
    NguiAutoCompleteDirective,
    CreationMatchModalComponent,
],
    templateUrl: './creation-match.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './creation-match.component.css'
})
export class CreationMatchComponent implements OnInit {
  private logService = inject(LogService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private matchsService = inject(MatchsService);
  private combattantsService = inject(CombattantsService);
  private rulesetsService = inject(RulesetsService);
  private tagsService = inject(TagsService);

  estModalVisible = false;
  nouveauMatch?: NouveauMatch;
  formCreerMatch!: FormGroup;
  combattantsListe!: Combattant[];
  rulesets?: Ruleset[];
  tags: TagCb[] = [];
  rulesetChoisi?: Ruleset;
  a?: Combattant;
  b?: Combattant;
  colorA?: string;
  colorB?: string;
  rechercheCombattantA?: string;
  couleurs = couleurs;
  estLog = false;

  /**
   * Initialisation données et formulaire
   */

  ngOnInit(): void {
    this.logService.notification$.subscribe(e => this.estLog = e);
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
    this.tagsService.getTags().subscribe((tags) => {
      tags.forEach((tag) =>
        this.tags.push({
          id: tag.id,
          code: tag.code,
          checked: false,
        })
      );
    });
  }

  initForm() {
    this.a = undefined;
    this.b = undefined;
    this.colorA = couleurs[0].code;
    this.colorB = couleurs[1].code;

    this.formCreerMatch = this.formBuilder.group({
      combattantA: null,
      combattantB: null,
      couleurA: couleurs[0].code,
      couleurB: couleurs[1].code,
      tags: null,
    });
    this.formCreerMatch.valueChanges.subscribe((values) => {
      this.rulesetChoisi = undefined;
      this.a = values.combattantA;
      this.b = values.combattantB;
      this.colorA = values.couleurA;
      this.colorB = values.couleurB;
    });
  }

  /**
   * Interractions formulaire
   */

  formatName(item: Combattant): string {
    // return `${item.prenom} ${item.nom} (${item.club?.nomCourt})`;
    return `${item.prenom}`;
  }

  onCheckTag($event: any) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;
    this.tags.forEach((tag) => {
      if (tag.id == id) {
        tag.checked = isChecked;
      }
    });
  }

  /**
   * Etapes de création du match
   */

  creerMatch() {
    if (this.estIncomplet()) {
      alert('Certains champs sont incomplets');
    } else if (this.estIncorrect()) {
      alert('Les champs sont mal remplis');
    } else {
      this.nouveauMatch = new NouveauMatch(
        this.formCreerMatch.value.combattantA.id,
        this.formCreerMatch.value.combattantB.id,
        this.formCreerMatch.value.couleurA,
        this.formCreerMatch.value.couleurB,
        0,
        new Date(),
        this.tags.filter((tag) => tag.checked),
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
      this.formCreerMatch.value.couleurB
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
    this.rulesetChoisi = this.rulesets![0];
    const vulnerants = this.rulesetChoisi!.vulnerants;
    const cibles = this.rulesetChoisi!.cibles;
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

  /**
   * Fin de la création du match
   */
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
            this.router.navigate(['match', matchCree.id, 'arbitrage']);
            break;
          case 'rester':
            this.initForm();
            break;
        }
      });
  }

  annulerCreation() {
    this.estModalVisible = false;
  }
}
