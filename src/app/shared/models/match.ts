import { Combattant } from './combattant';

export class Match {
  id!: number;
  bleu!: Combattant;
  rouge!: Combattant;
  scoreBleu: number = 0;
  scoreRouge: number = 0;
  timerStart: number = 0;
  timerEnd: number = 600;
  timerReverse: boolean = true;
}
