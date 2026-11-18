export class Item {
  id!: number;
  type!: string;
  libelle!: string;
  code?: string;
  checked?: false;
  flags?: string[];
}

export interface detailsItem {
  [key: string]: boolean;
}

export const couleurs: Item[] = [
  {
    id:0,
    type: 'couleur',
    code: 'bleu',
    libelle: 'rgb(68, 143, 255)',
  },
  {
    id:0,
    type: 'couleur',
    code: 'jaune',
    libelle: 'rgb(189, 152, 32)',
  }
] as Item[];
