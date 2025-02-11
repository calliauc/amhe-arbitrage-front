import { Combattant } from './combattant';
import { RulesetRef } from './ruleset-ref';

export class NouveauCoup {
  matchId!: number;
  attaquant!: Combattant;
  defenseur!: Combattant;
  attaquantCouleur!: string;
  defenseurCouleur!: string;
  attaquantScore!: number;
  defenseurScore!: number;
  vulnerant!: RulesetRef;
  cible?: RulesetRef;
  doubleAtk!: boolean;
  doubleDef!: boolean;
  afterblow!: boolean;
  simultanee!: boolean;
  faute!: boolean;
}
