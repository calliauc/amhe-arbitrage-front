import { Ruleset } from './ruleset';
import { Tag } from './tag';

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
  tags: Tag[] = [];
  ruleset?: Ruleset;

  constructor(
    idInscritA: number,
    idInscritB: number,
    idEvenement: number,
    idPoule: number,
    timer: number,
    tags: Tag[],
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
