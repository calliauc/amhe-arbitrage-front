import { Ruleset } from './ruleset';
import { Item } from './item';

export class NouveauMatch {
  inscritA: {
    id: number;
  };
  inscritB: {
    id: number;
  };
  evenement: {
    id: number;
  };
  poule?: {
    id?: number;
  };
  timer: number;
  tags: number[];
  ruleset?: Ruleset;

  constructor(
    idInscritA: number,
    idInscritB: number,
    idEvenement: number,
    idPoule: number,
    timer: number,
    tags: number[],
    idRuleset?: number,
  ) {
    this.inscritA = { id: idInscritA };
    this.inscritB = { id: idInscritB };
    this.evenement = { id: idEvenement };
    if (idPoule){
      this.poule = { id: idPoule };
    }
    this.timer = timer;
    this.tags = tags;
    if (idRuleset){
      this.ruleset = { id: idRuleset };
    }
  }
}
