import { Component, OnInit } from '@angular/core';
import { GestionCiblesComponent } from './gestion-cibles/gestion-cibles.component';
import { GestionVulnerantsComponent } from './gestion-vulnerants/gestion-vulnerants.component';
import { GestionRulesetsComponent } from './gestion-rulesets/gestion-rulesets.component';
import { GestionTagsComponent } from './gestion-tags/gestion-tags.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-gestion-referentiels',
  standalone: true,
  imports: [
    GestionCiblesComponent,
    GestionVulnerantsComponent,
    GestionRulesetsComponent,
    GestionTagsComponent,
    LoginComponent,
  ],
  templateUrl: './gestion-referentiels.component.html',
  styleUrl: './gestion-referentiels.component.css',
})
export class GestionReferentielsComponent implements OnInit {
  estModateSecuVisible: boolean = false;
  estLectureSeule: boolean = true;

  ngOnInit(): void {}
  updateLogin(lock: boolean) {
    this.estLectureSeule = lock;
  }
}
