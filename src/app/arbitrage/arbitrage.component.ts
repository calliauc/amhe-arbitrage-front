import { Component } from '@angular/core';
import { CoupLongswordComponent } from './coup-longsword/coup-longsword.component';
import { HistoriqueCoupsComponent } from './historique-coups/historique-coups.component';
import { SuiviMatchComponent } from './suivi-match/suivi-match.component';

@Component({
  selector: 'app-arbitrage',
  standalone: true,
  imports: [
    CoupLongswordComponent,
    SuiviMatchComponent,
    HistoriqueCoupsComponent,
  ],
  templateUrl: './arbitrage.component.html',
  styleUrl: './arbitrage.component.css',
})
export class ArbitrageComponent {}
