import { Club } from './club';

export enum Couleurs {
  Bleu = 'bleu',
  Rouge = 'rouge',
}

export class Combattant {
  id?: number;
  prenom?: string;
  nom?: string;
  pseudo?: string;
  club?: Club;
  couleur?: Couleurs;
}
