import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RulesetAfficherComponent } from '../ruleset-afficher/ruleset-afficher.component';
import { RulesetEditerComponent } from '../ruleset-editer/ruleset-editer.component';
import { Ruleset } from '../../../shared/models/ruleset';

@Component({
  selector: 'app-ruleset-ligne',
  standalone: true,
  imports: [RulesetAfficherComponent, RulesetEditerComponent],
  templateUrl: './ruleset-ligne.component.html',
  styleUrl: './ruleset-ligne.component.css',
})
export class RulesetLigneComponent {
  @Input() ruleset!: Ruleset;
  @Input() estPair!: boolean;
  @Input() estLectureSeule!: boolean;
  @Output() supprimerRuleset: EventEmitter<number> = new EventEmitter();
  @Output() modifierRuleset: EventEmitter<Ruleset> = new EventEmitter();
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
