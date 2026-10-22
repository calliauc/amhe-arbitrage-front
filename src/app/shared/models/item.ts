export class Item {
  public id!: number;
  public code!: string;
  public libelle?: string;
  public checked?: false;
}

export const couleurs: Item[] = [
  // {
  //   code: 'rgb(162, 17, 190)',
  //   libelle: 'violet',
  // },
  {
    id:0,
    code: 'rgb(68, 143, 255)',
    libelle: 'bleu',
  },
  // {
  //   code: 'rgb(53, 231, 62)',
  //   libelle: 'vert',
  // },
  {
    id:0,
    code: 'rgb(189, 152, 32)',
    libelle: 'jaune',
  },
  // {
  //   code: 'rgb(252, 102, 102)',
  //   libelle: 'rouge',
  // },
] as Item[];
