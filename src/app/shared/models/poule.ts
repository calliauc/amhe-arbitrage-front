import { Combattant } from './combattant';
import { Tag } from './tag';

export class Poule {
  id?: number;
  nom!: String;
  tags!: Tag[];
}
