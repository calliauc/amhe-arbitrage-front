import { Component } from '@angular/core';
import { CombattantsService } from '../../shared/services/combattants.service';
import { Combattant } from '../../shared/classes/combattant';

@Component({
  selector: 'app-combattant-editer',
  standalone: true,
  imports: [],
  templateUrl: './combattant-editer.component.html',
  styleUrl: './combattant-editer.component.css',
})
export class CombattantEditerComponent {
  constructor(private combattantService: CombattantsService) {}

  creerCombattant(combattant: Combattant) {
    this.combattantService.ajouterCombattant(combattant);
  }
}
