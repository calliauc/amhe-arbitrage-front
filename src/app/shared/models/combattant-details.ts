import { Combattant } from './combattant';
import { Match } from './match';
import { TagsFiltres } from './tag';

export class CombattantDetails {
  combattant!: Combattant;
  matchs!: Match[];
  tags!: TagsFiltres;
  pointsMarques!: number;
  pointsPerdus!: number;
  coupsSubis!: CombattantDetailsCoups;
  coupsMarques!: CombattantDetailsCoups;
}

export class CombattantDetailsCoups {
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
