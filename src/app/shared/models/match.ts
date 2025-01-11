import { Combattant } from './combattant';

export class Match {
  id!: number;
  bleu!: Combattant;
  rouge!: Combattant;
  scoreBleu: number = 0;
  scoreRouge: number = 0;
  timer: number = 0;
  timerMax: number = 600;
  timerSens: boolean = true;
}
