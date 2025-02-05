import { Ruleset } from './ruleset';

export class NouveauMatch {
  infosA: {
    id: number;
  };
  infosB: {
    id: number;
  };
  couleurA: string;
  couleurB: string;
  timer: number;
  dateCreation!: Date;
  ruleset: Ruleset;

  constructor(
    a: number,
    b: number,
    couleurA: string,
    couleurB: string,
    timer: number,
    dateCreation: Date,
    ruleset: Ruleset
  ) {
    this.infosA = { id: a };
    this.infosB = { id: b };
    this.couleurA = couleurA;
    this.couleurB = couleurB;
    this.timer = timer;
    this.dateCreation = dateCreation;
    this.ruleset = ruleset;
  }
}
