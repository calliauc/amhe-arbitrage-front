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
  ruleset: Ruleset;

  constructor(
    a: number,
    b: number,
    couleurA: string,
    couleurB: string,
    ruleset: Ruleset
  ) {
    this.infosA = { id: a };
    this.infosB = { id: b };
    this.couleurA = couleurA;
    this.couleurB = couleurB;
    this.ruleset = ruleset;
  }
}
