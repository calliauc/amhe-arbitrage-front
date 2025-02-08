import { Component } from '@angular/core';
import { GestionCiblesComponent } from './gestion-cibles/gestion-cibles.component';
import { GestionVulnerantsComponent } from './gestion-vulnerants/gestion-vulnerants.component';
import { GestionRulesetsComponent } from './gestion-rulesets/gestion-rulesets.component';
import { Secu } from '../shared/models/secu';
import { SecuModalComponent } from '../shared/modales/secu-modal/secu-modal.component';
import { GestionTagsComponent } from './gestion-tags/gestion-tags.component';

@Component({
  selector: 'app-gestion-referentiels',
  standalone: true,
  imports: [
    GestionCiblesComponent,
    GestionVulnerantsComponent,
    GestionRulesetsComponent,
    GestionTagsComponent,
    SecuModalComponent,
  ],
  templateUrl: './gestion-referentiels.component.html',
  styleUrl: './gestion-referentiels.component.css',
})
export class GestionReferentielsComponent {
  estModateSecuVisible: boolean = false;
  estLectureSeule: boolean = true;

  ouvrirSecu() {
    this.estModateSecuVisible = true;
  }

  deverouiller(secu: Secu) {
    if (secu.secret === 'secret') this.estLectureSeule = false;
    this.estModateSecuVisible = false;
  }
  annuler() {
    this.estModateSecuVisible = false;
  }

  stopModif() {
    this.estLectureSeule = true;
  }
}
