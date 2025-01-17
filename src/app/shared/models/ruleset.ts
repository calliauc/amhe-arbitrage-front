import { RulesetRef } from './ruleset-ref';

export class Ruleset {
  id?: number;
  nom?: string;
  description?: string;
  timerLimite?: number;
  timerReverse?: boolean;
  vulnerants?: RulesetRef[];
  cibles?: RulesetRef[];
}
