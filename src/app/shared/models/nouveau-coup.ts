import { Combattant } from './combattant';
import { PartieCorps } from './partie-corps';
import { Vulnerant } from './vulnerants';

export class NouveauCoup {
  matchId!: number;
  ataquantId!: Combattant;
  rougeId!: Combattant;
  vulnerant!: Vulnerant;
  partieCorps?: PartieCorps;
}
