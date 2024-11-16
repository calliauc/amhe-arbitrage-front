export class PartieCorps {
  public constructor(
    public readonly code: string,
    public readonly libelle: string
  ) {}
}
export class PartieCorpsLongsword extends PartieCorps {
  public static readonly tete = new PartieCorpsLongsword(
    'tête',
    ' à la tête de '
  );
  public static readonly torse = new PartieCorpsLongsword(
    'torse',
    ' au torse de '
  );
  public static readonly bras = new PartieCorpsLongsword(
    'bras',
    ' au bras de '
  );
  public static readonly main = new PartieCorpsLongsword(
    'main',
    ' à la main de '
  );
  public static readonly jambe = new PartieCorpsLongsword(
    'jambe',
    ' à la jambe de '
  );
  public static readonly lutte = new PartieCorpsLongsword('lutte', '');
  public static readonly interdit = new PartieCorpsLongsword(
    'coup interdit',
    ' à utilisé un coup interdit sur '
  );

  public static readonly liste = [
    this.tete,
    this.torse,
    this.bras,
    this.main,
    this.jambe,
    this.lutte,
    this.interdit,
  ];
}
