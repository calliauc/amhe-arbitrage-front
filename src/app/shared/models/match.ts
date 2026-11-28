import { Evenement } from './evenement';
import { Inscrit } from './inscrit';
import { Poule } from './poule';
import { Ruleset } from './ruleset';
import { Item } from './item';

export class Match {
  id!: number;
  evenement!: Evenement;
  poule?: Poule;
  code?: string;
  inscritA!: Inscrit;
  inscritB!: Inscrit;
  scoreA = 0;
  scoreB = 0;
  matchNull?: boolean;
  vainqueur?: Inscrit;
  dateCreation?: Date;
  dateDebut?: Date;
  dateFin?: Date;
  statut!: string;
  timer = 0;
  tags: Item[] = [];
  ruleset!: Ruleset;
}
