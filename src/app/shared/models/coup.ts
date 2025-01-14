import { Combattant } from './combattant';
import { Cible } from './cible';
import { Vulnerant } from './vulnerant';

export class Coup {
  id!: number;
  matchId!: number;
  attaquant!: Combattant;
  defenseur!: Combattant;
  attaquantCouleur!: string;
  defenseurCouleur!: string;
  vulnerant!: Vulnerant;
  cible?: Cible;
}
