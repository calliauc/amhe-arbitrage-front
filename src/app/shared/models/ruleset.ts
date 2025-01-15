export class Ruleset {
  id?: number;
  nom?: string;
  description?: string;
  timerStart?: number;
  timerEnd?: number;
  timerReverse?: boolean;
  vulnerants?: number[];
  cibles?: number[];
}
