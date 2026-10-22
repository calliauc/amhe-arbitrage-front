import { Inscrit } from './inscrit';
import { Item } from './item';

export class Coup {
  id!: number;
  matchId!: number;
  attaquant!: Inscrit;
  defenseur!: Inscrit;
  attaquantCouleur!: string;
  defenseurCouleur!: string;
  attaquantScore!: number;
  defenseurScore!: number;
  timecode!: Date;
  doubleAtk = false;
  doubleDef = false;
  afterblow = false;
  simultanee = false;
  faute = false;
  vulnerant!: Item;
  cible?: Item;
}
