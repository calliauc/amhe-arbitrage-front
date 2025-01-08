import { HistoCoup } from './histo-coup';

export class Match {
  id?: number;
  idA?: number;
  scoreA?: number;
  idB?: number;
  scoreB?: number;
  timer?: number;
  timerMax?: number;
  sensTimer?: boolean;
  listeCoups?: HistoCoup[];
  // Timecodes creation/debut/fin
}
