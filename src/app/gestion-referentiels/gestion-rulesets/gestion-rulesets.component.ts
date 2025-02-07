import { Component, Input, OnInit } from '@angular/core';
import { RulesetLigneComponent } from './ruleset-ligne/ruleset-ligne.component';
import { RulesetEditerComponent } from './ruleset-editer/ruleset-editer.component';
import { Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Ruleset } from '../../shared/models/ruleset';
import { RulesetsService } from '../../shared/services/rulesets.service';

@Component({
  selector: 'app-gestion-rulesets',
  standalone: true,
  imports: [RulesetLigneComponent, RulesetEditerComponent, CommonModule],
  templateUrl: './gestion-rulesets.component.html',
  styleUrl: './gestion-rulesets.component.css',
})
export class GestionRulesetsComponent implements OnInit {
  @Input() estLectureSeule!: boolean;

  rulesetsListe?: Ruleset[];
  rulesetsListe$?: Observable<Ruleset[]>;
  estModeCreation: boolean;
  nouveauRuleset: Ruleset;
  constructor(private rulesetsService: RulesetsService) {
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

  creerRuleset(rulesetCree: Ruleset) {
    this.rulesetsListe$ = this.rulesetsListe$?.pipe(
      tap((liste) => (this.estModeCreation = false))
    );
  }

  supprimerRuleset(id: number) {
    this.rulesetsService
      .supprimerRuleset(id)
      .subscribe(() => this.recupererRulesets());
  }
}
