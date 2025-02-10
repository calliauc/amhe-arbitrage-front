import { Routes } from '@angular/router';
import { ArbitrageComponent } from './arbitrage/arbitrage.component';
import { AccueilComponent } from './accueil/accueil.component';
import { GestionCombattantsComponent } from './gestion-combattants/gestion-combattants.component';
import { CreationMatchComponent } from './creation-match/creation-match.component';
import { GestionMatchsComponent } from './gestion-matchs/gestion-matchs.component';
import { GestionClubsComponent } from './gestion-clubs/gestion-clubs.component';
import { GestionReferentielsComponent } from './gestion-referentiels/gestion-referentiels.component';
import { GestionPoulesComponent } from './gestion-poules/gestion-poules.component';

export const routes: Routes = [
  { path: 'creer-match', component: CreationMatchComponent },
  { path: 'matchs', component: GestionMatchsComponent },
  { path: 'arbitrage/:id', component: ArbitrageComponent },
  { path: 'poules', component: GestionPoulesComponent },
  { path: 'combattants', component: GestionCombattantsComponent },
  { path: 'clubs', component: GestionClubsComponent },
  { path: 'referentiels', component: GestionReferentielsComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: '**', component: AccueilComponent },
];
