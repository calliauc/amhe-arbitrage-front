import { Evenement } from './evenement';
import { Inscrit } from './inscrit';
import { Poule } from './poule';
import { Ruleset } from './ruleset';
import { Item } from './item';

export class Match {
  id!: number;
  evenement!: Evenement;
  poule?: Poule;
  inscritA!: Inscrit;
  inscritB!: Inscrit;
  couleurA!: string;
  couleurB!: string;
  scoreA = 0;
  scoreB = 0;
  dateCreation?: Date;
  dateDebut?: Date;
  dateFin?: Date;
  statut!: string;
  timer = 0;
  tags: Item[] = [];
  ruleset!: Ruleset;
}
