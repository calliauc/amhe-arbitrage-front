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
  poule: {
    id: number;
  };
  timer: number;
  tags: Tag[] = [];
  ruleset: Ruleset;

  constructor(
    inscritA: number,
    inscritB: number,
    evenement: number,
    poule: number,
    timer: number,
    tags: Tag[],
    ruleset: Ruleset,
  ) {
    this.inscritA = { id: inscritA };
    this.inscritB = { id: inscritB };
    this.evenement = { id: evenement };
    this.poule = { id: poule };
    this.timer = timer;
    this.tags = tags;
    this.ruleset = ruleset;
  }
}
