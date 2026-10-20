import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Match } from '../shared/models/match';
import { MatchsService } from '../shared/services/matchs.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { InscritsService } from '../shared/services/inscrits.service';
import { Inscrit } from '../shared/models/inscrit';
import { NouveauMatch } from '../shared/models/nouveau-match';
import { Ruleset } from '../shared/models/ruleset';
import { RulesetsService } from '../shared/services/rulesets.service';

import { couleurs } from '../shared/models/ruleset-ref';
import { CreationMatchModalComponent } from './creation-match-modal/creation-match-modal.component';
import { TagCb } from '../shared/models/tag';
import { TagsService } from '../shared/services/tags.service';
import { NguiAutoCompleteDirective } from '@ngui/auto-complete';
import { AuthV1Service } from '../shared/services/auth-v1.service';
import { RolesNames } from '../shared/models/roles';
import { Evenement } from '../shared/models/evenement';
import { PoulesService } from '../shared/services/poules.service';
import { Poule } from '../shared/models/poule';

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
  private Auth = AuthV1Service;
  private logService = inject(AuthV1Service);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private matchsService = inject(MatchsService);
  private inscritsService = inject(InscritsService);
  private poulesService = inject(PoulesService);
  // private rulesetsService = inject(RulesetsService);
  private tagsService = inject(TagsService);

  estModalVisible = false;
  evenement!: Evenement;
  nouveauMatch?: NouveauMatch;
  formCreerMatch!: FormGroup;
  inscritsListe!: Inscrit[];
  poulesListe!: Poule[];
  // rulesets?: Ruleset[];
  tags: TagCb[] = [];
  rulesetChoisi?: Ruleset;
  inscritA?: Inscrit;
  inscritB?: Inscrit;
  colorA?: string;
  colorB?: string;
  rechercheinscritA?: string;
  couleurs = couleurs;
  role:RolesNames = 'guest';

  /**
   * Initialisation données et formulaire
   */
  constructor(){
    this.evenement = JSON.parse(localStorage.getItem('event') || "{\"id\":0}") as Evenement;
  }

  ngOnInit(): void {
    if (this.evenement.id == 0){
      localStorage.setItem('origin-page', 'creer-match');
      this.router.navigate(['evenements']);
    }
    this.logService.notificationRole$.subscribe(e => this.role = e);
    this.getDatas(this.evenement.id);
    this.initForm();
  }

  getDatas(idEvent: number) {
    this.inscritsService.getInscritsByEvent(idEvent).subscribe((liste) => {
      this.inscritsListe = liste;
      
    });
    this.poulesService.getPoulesByEvent(idEvent).subscribe((liste) => {
      this.poulesListe = liste;
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
    this.inscritA = undefined;
    this.inscritB = undefined;
    // this.colorA = couleurs[0].code;
    // this.colorB = couleurs[1].code;

    this.formCreerMatch = this.formBuilder.group({
      inscritA: null,
      inscritB: null,
      // couleurA: couleurs[0].code,
      // couleurB: couleurs[1].code,
      tags: null,
    });
    this.formCreerMatch.valueChanges.subscribe((values) => {
      this.rulesetChoisi = undefined;
      this.inscritA = values.inscritA;
      this.inscritB = values.inscritB;
      // this.colorA = values.couleurA;
      // this.colorB = values.couleurB;
    });
  }

  /**
   * Interractions formulaire
   */

  formatName(item: Inscrit): string {
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
        this.formCreerMatch.value.inscritA.id,
        this.formCreerMatch.value.inscritB.id,
        this.formCreerMatch.value.couleurA, // evenement
        this.formCreerMatch.value.couleurB, // poule
        0,
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
      this.formCreerMatch.value.inscritA &&
      this.formCreerMatch.value.inscritB &&
      this.formCreerMatch.value.couleurA &&
      this.formCreerMatch.value.couleurB
    );
  }

  estIncorrect(): boolean {
    return (
      this.formCreerMatch.value.inscritA ===
        this.formCreerMatch.value.inscritB ||
      this.formCreerMatch.value.couleurA === this.formCreerMatch.value.couleurB
    );
  }

  setRuleset(): Ruleset {
    this.rulesetChoisi = this.evenement.ruleset;
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
