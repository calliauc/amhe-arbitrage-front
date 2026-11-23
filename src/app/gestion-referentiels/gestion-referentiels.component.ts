import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { GestionRulesetsComponent } from './gestion-rulesets/gestion-rulesets.component';
import { AuthV1Service } from '../shared/services/auth-v1.service';
import { RolesNames } from '../shared/models/roles';
import { GestionItemsComponent } from './gestion-items/gestion-items.component';
import { MenuMobileService } from '../shared/services/menu-mobile.service';

@Component({
    selector: 'app-gestion-referentiels',
    imports: [
        GestionRulesetsComponent,
        GestionItemsComponent,
    ],
    templateUrl: './gestion-referentiels.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './gestion-referentiels.component.css'
})
export class GestionReferentielsComponent implements OnInit {
  private logService = inject(AuthV1Service);
  private menuMobileService = inject(MenuMobileService);
  role:RolesNames = 'guest';

  ngOnInit(): void {
    this.menuMobileService.pageActuelle.next('REFERENTIELS');
    this.logService.notificationRole$.subscribe(e => this.role = e)
  }
}
