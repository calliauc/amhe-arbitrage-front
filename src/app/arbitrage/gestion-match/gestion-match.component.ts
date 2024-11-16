import { Component, OnInit } from '@angular/core';
import { ScoreCombattantComponent } from './score-combattant/score-combattant.component';
import { ChronoComponent } from './chrono/chrono.component';

@Component({
  selector: 'app-gestion-match',
  standalone: true,
  imports: [ScoreCombattantComponent, ChronoComponent],
  templateUrl: './gestion-match.component.html',
  styleUrl: './gestion-match.component.css',
})
export class GestionMatchComponent {}
