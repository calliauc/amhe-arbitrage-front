import { Combattant } from './combattant';
import { RulesetRef } from './ruleset-ref';

export class NouveauCoup {
  matchId!: number;
  attaquant!: Combattant;
  defenseur!: Combattant;
  attaquantCouleur!: string;
  defenseurCouleur!: string;
  vulnerant!: RulesetRef;
  cible?: RulesetRef;
}
