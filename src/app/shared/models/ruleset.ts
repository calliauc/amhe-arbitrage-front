import { Item } from './item';

export class Ruleset {
  id?: number;
  nom?: string;
  description?: string;
  timerLimite?: number;
  timerReverse?: boolean;
  vulnerants?: Item[];
  cibles?: Item[];
}
