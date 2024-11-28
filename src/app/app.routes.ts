import { Routes } from '@angular/router';
import { ArbitrageComponent } from './arbitrage/arbitrage.component';
import { AccueilComponent } from './accueil/accueil.component';
import { GestionCombattantsComponent } from './gestion-combattants/gestion-combattants.component';

export const routes: Routes = [
  { path: 'arbitrage', component: ArbitrageComponent },
  { path: 'combattants', component: GestionCombattantsComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: '**', component: AccueilComponent },
];
