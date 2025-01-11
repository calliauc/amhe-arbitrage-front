export class Vulnerant {
  public constructor(
    public readonly code: string,
    public readonly libelle: string
  ) {}
}
export class VulnerantLongsword extends Vulnerant {
  public static readonly estoc = new VulnerantLongsword(
    'estoc',
    ' porte un estoc'
  );
  public static readonly taille = new VulnerantLongsword(
    'taille',
    ' porte un coup de taille'
  );
  public static readonly entaille = new VulnerantLongsword(
    'entaille',
    ' inflige une entaille'
  );
  public static readonly lutte = new VulnerantLongsword(
    'lutte',
    ' remporte la lutte contre '
  );
  public static readonly liste = [
    this.estoc,
    this.taille,
    this.entaille,
    this.lutte,
  ];
}

export class VulnerantHache extends Vulnerant {
  public static readonly croix = new VulnerantHache(
    'croix',
    ' frappe avec la croix sur '
  );
  public static readonly pique = new VulnerantHache(
    'pique',
    ' frappe avec la pique sur '
  );
  public static readonly talon = new VulnerantHache(
    'talon',
    ' frappe avec le talon sur '
  );
  public static readonly lutte = new VulnerantHache(
    'lutte',
    ' remporte la lutte contre '
  );
  public static readonly liste = [
    this.croix,
    this.pique,
    this.talon,
    this.lutte,
  ];
}
