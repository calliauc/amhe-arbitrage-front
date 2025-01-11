export class NouveauMatch {
  bleu: {
    id: number;
  };
  rouge: {
    id: number;
  };
  timer?: number;
  timerMax?: number;
  sensTimer?: boolean;

  constructor(bleu: number, rouge: number) {
    this.bleu = { id: bleu };
    this.rouge = { id: rouge };
  }
}
