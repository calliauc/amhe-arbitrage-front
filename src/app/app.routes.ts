import { Routes } from '@angular/router';
import { ArbitrageComponent } from './arbitrage/arbitrage.component';
import { AccueilComponent } from './accueil/accueil.component';

export const routes: Routes = [
  { path: 'arbitrage', component: ArbitrageComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: '**', component: AccueilComponent },
];
