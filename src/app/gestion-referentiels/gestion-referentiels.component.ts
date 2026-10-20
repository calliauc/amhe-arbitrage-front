import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { GestionCiblesComponent } from './gestion-cibles/gestion-cibles.component';
import { GestionVulnerantsComponent } from './gestion-vulnerants/gestion-vulnerants.component';
import { GestionRulesetsComponent } from './gestion-rulesets/gestion-rulesets.component';
import { GestionTagsComponent } from './gestion-tags/gestion-tags.component';
import { AuthV1Service } from '../shared/services/auth-v1.service';
import { RolesNames } from '../shared/models/roles';

@Component({
    selector: 'app-gestion-referentiels',
    imports: [
        GestionCiblesComponent,
        GestionVulnerantsComponent,
        GestionRulesetsComponent,
        GestionTagsComponent,
    ],
    templateUrl: './gestion-referentiels.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './gestion-referentiels.component.css'
})
export class GestionReferentielsComponent implements OnInit {
  private logService = inject(AuthV1Service);
  role:RolesNames = 'guest';

  ngOnInit(): void {
    this.logService.notificationRole$.subscribe(e => this.role = e)
  }
}
