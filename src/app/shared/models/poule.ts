import { Evenement } from './evenement';
import { Inscrit } from './inscrit';
import { Match } from './match';
import { Tag } from './tag';

export class Poule {
  id?: number;
  nom!: string;
  description?: string;
  evenement!: Evenement;
  inscrits: Inscrit[] = [];
  matchs: Match[] = [];
  tags: Tag[] = [];
}
