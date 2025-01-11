import { Component, Input } from '@angular/core';
import { ScoreCombattantComponent } from './score-combattant/score-combattant.component';
import { ChronoComponent } from './chrono/chrono.component';
import { Match } from '../../shared/models/match';
import { CombattantComponent } from './combattant/combattant.component';

@Component({
  selector: 'app-gestion-match',
  standalone: true,
  imports: [ScoreCombattantComponent, ChronoComponent, CombattantComponent],
  templateUrl: './suivi-match.component.html',
  styleUrl: './suivi-match.component.css',
})
export class SuiviMatchComponent {
  @Input() match!: Match;
}
