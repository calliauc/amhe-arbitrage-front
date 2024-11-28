import { EventEmitter, Injectable } from '@angular/core';
import { Combattant, Couleurs } from '../classes/combattant';

@Injectable({
  providedIn: 'root',
})
export class CombattantsService {
  ajoutCombattant: EventEmitter<Combattant> = new EventEmitter();

  listeCombattants = [
    {
      id: 1,
      prenom: 'Clement',
      nom: 'Calliau',
      pseudo: 'Makhai',
      club: 'Burdigala',
      couleur: Couleurs.Bleu,
    },
    {
      id: 2,
      prenom: 'Alex',
      nom: 'Goches',
      pseudo: 'Fiore',
      club: 'Burdigala',
      couleur: Couleurs.Rouge,
    },
  ] as Combattant[];
  constructor() {}

  getCombattants(): Combattant[] {
    return this.listeCombattants;
  }

  ajouterCombattant(combattantAAjouter: Combattant): Combattant[] {
    this.listeCombattants.push(combattantAAjouter);
    this.ajoutCombattant.emit(combattantAAjouter);
    console.log(combattantAAjouter);
    return this.listeCombattants;
  }
}
