export class RulesetRef {
  public code!: string;
  public libelle?: string;
  public checked = false;

  static getCodeByLibelle(tab: RulesetRef[], lib: string): string | undefined {
    return tab.find((elem) => elem.libelle == lib)?.code;
  }
}

export const couleurs: RulesetRef[] = [
  // {
  //   code: 'rgb(162, 17, 190)',
  //   libelle: 'violet',
  // },
  {
    code: 'rgb(68, 143, 255)',
    libelle: 'bleu',
  },
  // {
  //   code: 'rgb(53, 231, 62)',
  //   libelle: 'vert',
  // },
  {
    code: 'rgb(189, 152, 32)',
    libelle: 'jaune',
  },
  // {
  //   code: 'rgb(252, 102, 102)',
  //   libelle: 'rouge',
  // },
] as RulesetRef[];
