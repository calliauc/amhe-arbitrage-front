import { Club } from './club';
import { Inscrit } from './inscrit';
import { Ruleset } from './ruleset';

export class Evenement {
  id!: number;
  nom!: string;
  description?: string;
  dateDebut?: Date;
  dateFin?: Date;
  organisateur?: Club;
  inscrits?: Inscrit[];
  ruleset?: Ruleset;
}
