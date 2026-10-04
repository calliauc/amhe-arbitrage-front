import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { GestionCiblesComponent } from './gestion-cibles/gestion-cibles.component';
import { GestionVulnerantsComponent } from './gestion-vulnerants/gestion-vulnerants.component';
import { GestionRulesetsComponent } from './gestion-rulesets/gestion-rulesets.component';
import { GestionTagsComponent } from './gestion-tags/gestion-tags.component';
import { LogService } from '../shared/services/log.service';

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
  private logService = inject(LogService);
  estLog = false;

  ngOnInit(): void {
    this.logService.notification$.subscribe(e => this.estLog = e)
  }
}
