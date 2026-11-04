import { Item } from './item';

export class Ruleset {
  id?: number;
  nom?: string;
  description?: string;
  timerLimite?: number;
  timerReverse?: boolean;
  typesEchange?: Item[];
  vulnerants?: Item[];
  cibles?: Item[];
}
