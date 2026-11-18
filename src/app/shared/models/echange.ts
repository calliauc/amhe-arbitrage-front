import { Inscrit } from './inscrit';
import { Item } from './item';
import { Match } from './match';

export class EchangeTempApi {
  match!: number;
  type!: number;

  inscritA!: number;
  scoreA!: number;
  vulnerantA!: number;
  cibleA!: number;
  penaliteA?: number;

  inscritB!: number;
  scoreB!: number;
  vulnerantB?: number;
  cibleB?: number;
  penaliteB?: number;
}

export class EchangeTemp {
  match!: Match;
  type!: Item;

  inscritA!: Inscrit;
  scoreA!: number;
  vulnerantA!: Item;
  cibleA!: Item;
  penaliteA?: Item;

  inscritB!: Inscrit;
  scoreB!: number;
  vulnerantB?: Item;
  cibleB?: Item;
  penaliteB?: Item;
}

export class Echange extends EchangeTemp {
  id!: number;
  timecode!: Date;
}