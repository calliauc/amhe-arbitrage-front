import { Combattant } from './combattant';
import { PartieCorps } from './partieCorps';
import { Vulnerant } from './vulnerants';

export class HistoCoup {
  id?: number;
  matchId?: number;
  attaquant?: Combattant;
  defenseur?: Combattant;
  vulnerant?: Vulnerant;
  partieCorps?: PartieCorps;
}
