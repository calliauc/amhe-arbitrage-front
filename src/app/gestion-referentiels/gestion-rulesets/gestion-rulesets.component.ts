import { Component, Input, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { RulesetLigneComponent } from './ruleset-ligne/ruleset-ligne.component';
import { RulesetEditerComponent } from './ruleset-editer/ruleset-editer.component';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Ruleset } from '../../shared/models/ruleset';
import { RulesetsService } from '../../shared/services/rulesets.service';

@Component({
    selector: 'app-gestion-rulesets',
    imports: [RulesetLigneComponent, RulesetEditerComponent, CommonModule],
    templateUrl: './gestion-rulesets.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './gestion-rulesets.component.css'
})
export class GestionRulesetsComponent implements OnInit {
  private rulesetsService = inject(RulesetsService);

  @Input() estLectureSeule!: boolean;

  rulesetsListe?: Ruleset[];
  rulesetsListe$?: Observable<Ruleset[]>;
  estModeCreation: boolean;
  nouveauRuleset: Ruleset;
  constructor() {
    this.estModeCreation = false;
    this.nouveauRuleset = new Ruleset();
  }

  ngOnInit(): void {
    this.recupererRulesets();
  }

  modeAjout(): void {
    this.estModeCreation = true;
  }

  annulerEdition() {
    this.estModeCreation = false;
  }

  recupererRulesets() {
    this.rulesetsListe$ = this.rulesetsService.getRulesets();
  }

  creerRuleset() {
    this.rulesetsListe$ = this.rulesetsListe$?.pipe(
      tap(() => (this.estModeCreation = false))
    );
  }

  supprimerRuleset(id: number) {
    this.rulesetsService
      .supprimerRuleset(id)
      .subscribe(() => this.recupererRulesets());
  }
}
