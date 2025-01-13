export class NouveauMatch {
  bleu: {
    id: number;
  };
  rouge: {
    id: number;
  };
  timerStart?: number;
  timerEnd?: number;
  timerReverse?: boolean;

  constructor(
    bleu: number,
    rouge: number,
    timerStart: number,
    timerEnd: number,
    timerReverse: boolean
  ) {
    this.bleu = { id: bleu };
    this.rouge = { id: rouge };
    this.timerStart = timerStart;
    this.timerEnd = timerEnd;
    this.timerReverse = timerReverse;
  }
}
