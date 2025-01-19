import { Combattant } from './combattant';
import { Ruleset } from './ruleset';

export class Match {
  id!: number;
  infosA!: Combattant;
  infosB!: Combattant;
  couleurA!: string;
  couleurB!: string;
  scoreA: number = 0;
  scoreB: number = 0;
  timer: number = 0;
  ruleset!: Ruleset;
}
