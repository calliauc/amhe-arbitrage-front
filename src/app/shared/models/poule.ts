import { Combattant } from './combattant';
import { Tag } from './tag';

export class Poule {
  tags!: Tag[];
  combattants!: Combattant[];
  description!: String;
}
