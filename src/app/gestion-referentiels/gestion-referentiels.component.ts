import { Component, OnInit } from '@angular/core';
import { GestionCiblesComponent } from './gestion-cibles/gestion-cibles.component';
import { GestionVulnerantsComponent } from './gestion-vulnerants/gestion-vulnerants.component';
import { GestionRulesetsComponent } from './gestion-rulesets/gestion-rulesets.component';
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
export class GestionReferentielsComponent implements OnInit {
  estModateSecuVisible: boolean = false;
  estLectureSeule: boolean = true;

  ngOnInit(): void {
    this.estLectureSeule = localStorage.getItem('secu') !== 'unlocked';
  }

  ouvrirSecu() {
    this.estModateSecuVisible = true;
  }

  deverouiller() {
    this.estLectureSeule = false;
    this.estModateSecuVisible = false;
    localStorage.setItem('secu', 'unlocked');
  }
  annuler() {
    this.estModateSecuVisible = false;
  }

  stopModif() {
    this.estLectureSeule = true;
    localStorage.clear();
  }
}
