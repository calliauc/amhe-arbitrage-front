import { Club } from './club';

export class Individu {
  id?: number;
  prenom!: string;
  nom!: string;
  pseudo?: string;
  club?: Club;
}
