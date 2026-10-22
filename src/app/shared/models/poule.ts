import { Evenement } from './evenement';
import { Inscrit } from './inscrit';
import { Match } from './match';
import { Item } from './item';

export class Poule {
  id?: number;
  nom!: string;
  description?: string;
  evenement!: Evenement;
  inscrits: Inscrit[] = [];
  matchs: Match[] = [];
  items: Item[] = [];
}
