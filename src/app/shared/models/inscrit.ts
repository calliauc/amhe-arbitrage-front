import { Club } from './club';

export class Inscrit {
  id?: number;
  idIndividu!: number;
  idEvenement!: number;
  nom!: string;
  prenom!: string;
  pseudo?: string;
  club!: string;
  evenement!: string;
}
