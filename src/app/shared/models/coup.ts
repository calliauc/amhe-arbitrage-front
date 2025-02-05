import { Combattant } from './combattant';
import { RulesetRef } from './ruleset-ref';

export class Coup {
  id!: number;
  matchId!: number;
  attaquant!: Combattant;
  defenseur!: Combattant;
  attaquantCouleur!: string;
  defenseurCouleur!: string;
  attaquantScore!: number;
  defenseurScore!: number;
  timecode!: Date;
  doubleTouche: boolean = false;
  vulnerant!: RulesetRef;
  cible?: RulesetRef;
}
