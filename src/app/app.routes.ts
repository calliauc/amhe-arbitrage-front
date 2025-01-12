import { Routes } from '@angular/router';
import { ArbitrageComponent } from './arbitrage/arbitrage.component';
import { AccueilComponent } from './accueil/accueil.component';
import { GestionCombattantsComponent } from './gestion-combattants/gestion-combattants.component';
import { CreationMatchComponent } from './creation-match/creation-match.component';
import { GestionMatchsComponent } from './gestion-matchs/gestion-matchs.component';

export const routes: Routes = [
  { path: 'creer-match', component: CreationMatchComponent },
  { path: 'matchs', component: GestionMatchsComponent },
  { path: 'arbitrage/:id', component: ArbitrageComponent },
  { path: 'combattants', component: GestionCombattantsComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: '**', component: AccueilComponent },
];
