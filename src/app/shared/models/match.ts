import { Combattant } from './combattant';
import { Ruleset } from './ruleset';
import { Tag } from './tag';

export class Match {
  id!: number;
  infosA!: Combattant;
  infosB!: Combattant;
  couleurA!: string;
  couleurB!: string;
  scoreA = 0;
  scoreB = 0;
  dateCreation?: Date;
  dateDebut?: Date;
  dateFin?: Date;
  statut!: string;
  timer = 0;
  tags: Tag[] = [];
  ruleset!: Ruleset;
}
