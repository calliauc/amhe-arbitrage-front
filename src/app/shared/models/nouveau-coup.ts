import { Inscrit } from './inscrit';
import { RulesetRef } from './ruleset-ref';

export class NouveauCoup {
  matchId!: number;
  attaquant!: Inscrit;
  defenseur!: Inscrit;
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
