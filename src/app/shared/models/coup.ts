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
  doubleAtk: boolean = false;
  doubleDef: boolean = false;
  afterblow: boolean = false;
  simultanee: boolean = false;
  faute: boolean = false;
  vulnerant!: RulesetRef;
  cible?: RulesetRef;
}
