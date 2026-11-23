import { Club } from './club';

export class Inscrit {
  id!: number;
  idIndividu!: number;
  idEvenement!: number;
  nom!: string;
  prenom!: string;
  pseudo?: string;
  club!: string;
  estDesinscrit: boolean = false;
  estListeAttente: boolean = false;
  evenement!: string;
}
