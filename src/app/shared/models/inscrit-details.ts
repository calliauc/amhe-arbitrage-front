import { Inscrit } from './inscrit';
import { Match } from './match';
import { TagsFiltres } from './tag';

export class InscritDetails {
  inscrit!: Inscrit;
  matchs!: Match[];
  tags!: TagsFiltres;
  pointsMarques!: number;
  pointsPerdus!: number;
  coupsSubis!: InscritDetailsCoups;
  coupsMarques!: InscritDetailsCoups;
}

export class InscritDetailsCoups {
  total!: number;
  cibles?: DetailsCoupsListeElem[];
  vulnerants?: DetailsCoupsListeElem[];
  details?: DetailsCoupsListeElem[];
}

export class DetailsCoupsListeElem {
  code!: string;
  valeur!: number;
  pourcentage!: number;
}
