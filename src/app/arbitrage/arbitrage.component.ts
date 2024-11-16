import { Component } from '@angular/core';
import { CoupLongswordComponent } from './coup-longsword/coup-longsword.component';
import { GestionMatchComponent } from './gestion-match/gestion-match.component';
import { HistoriqueCoupsComponent } from './historique-coups/historique-coups.component';

@Component({
  selector: 'app-arbitrage',
  standalone: true,
  imports: [
    CoupLongswordComponent,
    GestionMatchComponent,
    HistoriqueCoupsComponent,
  ],
  templateUrl: './arbitrage.component.html',
  styleUrl: './arbitrage.component.css',
})
export class ArbitrageComponent {}
