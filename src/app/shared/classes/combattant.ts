export enum Couleurs {
  Bleu = 'bleu',
  Rouge = 'rouge',
}

export class Combattant {
  id?: number;
  prenom?: string;
  nom?: string;
  pseudo?: string;
  couleur?: Couleurs;
}
