import { Component } from '@angular/core';
import { GestionCiblesComponent } from './gestion-cibles/gestion-cibles.component';
import { GestionVulnerantsComponent } from './gestion-vulnerants/gestion-vulnerants.component';

@Component({
  selector: 'app-gestion-referentiels',
  standalone: true,
  imports: [GestionCiblesComponent, GestionVulnerantsComponent],
  templateUrl: './gestion-referentiels.component.html',
  styleUrl: './gestion-referentiels.component.css',
})
export class GestionReferentielsComponent {}
