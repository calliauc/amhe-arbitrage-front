export class RulesetRef {
  public code!: string;
  public libelle?: string;
  public checked: boolean = false;

  static getCodeByLibelle(tab: RulesetRef[], lib: string): string | undefined {
    return tab.find((elem) => elem.libelle == lib)?.code;
  }
}

export const couleurs: RulesetRef[] = [
  // {
  //   code: 'rgb(162, 17, 190)',
  //   libelle: 'violet',
  // } as RulesetRef,
  {
    code: 'rgb(68, 143, 255)',
    libelle: 'bleu',
  } as RulesetRef,
  // {
  //   code: 'rgb(53, 231, 62)',
  //   libelle: 'vert',
  // } as RulesetRef,
  {
    code: 'rgb(189, 152, 32)',
    libelle: 'jaune',
  } as RulesetRef,
  // {
  //   code: 'rgb(252, 102, 102)',
  //   libelle: 'rouge',
  // } as RulesetRef,
];
