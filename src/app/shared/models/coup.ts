import { Combattant } from './combattant';
import { PartieCorps } from './partie-corps';
import { Vulnerant } from './vulnerants';

export class Coup {
  id!: number;
  matchId!: number;
  attaquant!: Combattant;
  defenseur!: Combattant;
  attaquantCouleur!: string;
  defenseurCouleur!: string;
  vulnerant!: Vulnerant;
  partieCorps?: PartieCorps;
}
