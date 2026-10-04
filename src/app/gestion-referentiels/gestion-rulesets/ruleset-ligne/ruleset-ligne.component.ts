import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { RulesetAfficherComponent } from '../ruleset-afficher/ruleset-afficher.component';
import { RulesetEditerComponent } from '../ruleset-editer/ruleset-editer.component';
import { Ruleset } from '../../../shared/models/ruleset';

@Component({
    selector: 'app-ruleset-ligne',
    imports: [RulesetAfficherComponent, RulesetEditerComponent],
    templateUrl: './ruleset-ligne.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './ruleset-ligne.component.css'
})
export class RulesetLigneComponent {
  @Input() ruleset!: Ruleset;
  @Input() estPair!: boolean;
  @Input() estLog!: boolean;
  @Output() supprimerRuleset = new EventEmitter<number>();
  @Output() modifierRuleset = new EventEmitter<Ruleset>();
  estModif: boolean;

  constructor() {
    this.estModif = false;
  }

  lancerEdition(): void {
    this.estModif = true;
  }

  modifRulesetAnnulee() {
    this.estModif = false;
  }

  suppressionRuleset(id: number) {
    this.estModif = false;
    this.supprimerRuleset.emit(id);
  }

  modifRulesetTerminee(rulesetModifie: Ruleset) {
    this.modifierRuleset.emit(rulesetModifie);
    this.estModif = false;
  }
}
