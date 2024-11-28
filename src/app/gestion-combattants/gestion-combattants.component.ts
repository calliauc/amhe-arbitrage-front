import { Component, OnInit } from '@angular/core';
import { CombattantsService } from '../shared/services/combattants.service';
import { Combattant } from '../shared/classes/combattant';
import { CombattantLigneComponent } from './combattant-ligne/combattant-ligne.component';
import { CombattantEditerComponent } from './combattant-editer/combattant-editer.component';

@Component({
  selector: 'app-gestion-combattants',
  standalone: true,
  imports: [CombattantLigneComponent, CombattantEditerComponent],
  templateUrl: './gestion-combattants.component.html',
  styleUrl: './gestion-combattants.component.css',
})
export class GestionCombattantsComponent implements OnInit {
  combattentsListe?: Combattant[];
  constructor(private combattantService: CombattantsService) {}
  ngOnInit(): void {
    this.combattentsListe = this.combattantService.getCombattants();
  }
}
