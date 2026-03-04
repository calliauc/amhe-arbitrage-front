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
  doubleAtk = false;
  doubleDef = false;
  afterblow = false;
  simultanee = false;
  faute = false;
  vulnerant!: RulesetRef;
  cible?: RulesetRef;
}
