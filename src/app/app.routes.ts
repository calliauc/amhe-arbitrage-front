import { Routes } from '@angular/router';
import { ArbitrageComponent } from './arbitrage/arbitrage.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CreationMatchComponent } from './creation-match/creation-match.component';
import { GestionMatchsComponent } from './gestion-matchs/gestion-matchs.component';
import { GestionClubsComponent } from './gestion-clubs/gestion-clubs.component';
import { GestionReferentielsComponent } from './gestion-referentiels/gestion-referentiels.component';
import { GestionPoulesComponent } from './gestion-poules/gestion-poules.component';
import { AffichageMatchComponent } from './affichage-match/affichage-match.component';
import { AnnuaireComponent } from './annuaire/annuaire.component';
import { InscritsComponent } from './inscrits/inscrits.component';
import { InscritDetailsComponent } from './inscrits/inscrit-details/inscrit-details.component';
import { EvenementsComponent } from './evenements/evenements.component';
import { EvenementComponent } from './evenement/evenement.component';

export const routes: Routes = [
  { path: 'evenement', component: EvenementComponent },
  { path: 'evenements', component: EvenementsComponent },

  { path: 'matchs', component: GestionMatchsComponent },
  { path: 'poules', component: GestionPoulesComponent },
  { path: 'inscrits', component: InscritsComponent },

  { path: 'creer-match', component: CreationMatchComponent },
  { path: 'match/:id/arbitrage', component: ArbitrageComponent },
  { path: 'match/:id/details', component: AffichageMatchComponent },
  { path: 'inscrit/:id', component: InscritDetailsComponent },
  { path: 'clubs', component: GestionClubsComponent },
  { path: 'referentiels', component: GestionReferentielsComponent },
  { path: 'annuaire', component: AnnuaireComponent },
  // { path: 'accueil', component: AccueilComponent },
  { path: '**', component: EvenementComponent },
];
