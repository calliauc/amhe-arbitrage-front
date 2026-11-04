import { Inscrit } from './inscrit';
import { Item } from './item';
import { Match } from './match';

export class Echange {
  id!: number;
  match!: Match;
  type!: Item;
  timecode!: Date;

  inscritA!: Inscrit;
  inscritB!: Inscrit;
  scoreA!: number;
  scoreB!: number;

  vulnerantA!: Item;
  cibleA!: Item;
  penaliteA!: Item;

  vulnerantB!: Item;
  cibleB!: Item;
  penaliteB!: Item;
}
