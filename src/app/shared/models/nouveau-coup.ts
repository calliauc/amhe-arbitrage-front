import { Inscrit } from './inscrit';
import { Item } from './item';

export class NouveauCoup {
  matchId!: number;
  attaquant!: Inscrit;
  defenseur!: Inscrit;
  attaquantCouleur!: string;
  defenseurCouleur!: string;
  attaquantScore!: number;
  defenseurScore!: number;
  vulnerant!: Item;
  cible?: Item;
  doubleAtk!: boolean;
  doubleDef!: boolean;
  afterblow!: boolean;
  simultanee!: boolean;
  faute!: boolean;
}
