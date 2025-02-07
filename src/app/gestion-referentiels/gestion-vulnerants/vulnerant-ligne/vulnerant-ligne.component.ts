import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VulnerantAfficherComponent } from '../vulnerant-afficher/vulnerant-afficher.component';
import { VulnerantEditerComponent } from '../vulnerant-editer/vulnerant-editer.component';
import { RulesetRef } from '../../../shared/models/ruleset-ref';

@Component({
  selector: 'app-vulnerant-ligne',
  standalone: true,
  imports: [VulnerantAfficherComponent, VulnerantEditerComponent],
  templateUrl: './vulnerant-ligne.component.html',
  styleUrl: './vulnerant-ligne.component.css',
})
export class VulnerantLigneComponent {
  @Input() vulnerant!: RulesetRef;
  @Input() estPair!: boolean;
  @Input() estLectureSeule!: boolean;
  @Output() supprimerVulnerant: EventEmitter<string> = new EventEmitter();
  @Output() modifierVulnerant: EventEmitter<RulesetRef> = new EventEmitter();
  estModif: boolean;

  constructor() {
    this.estModif = false;
  }

  lancerEdition(): void {
    this.estModif = true;
  }

  modifVulnerantAnnulee() {
    this.estModif = false;
  }

  suppressionVulnerant(code: string) {
    this.estModif = false;
    this.supprimerVulnerant.emit(code);
  }

  modifVulnerantTerminee(vulnerantModifie: RulesetRef) {
    this.modifierVulnerant.emit(vulnerantModifie);
    this.estModif = false;
  }
}
