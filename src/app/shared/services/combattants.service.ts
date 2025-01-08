import { Injectable } from '@angular/core';
import { Combattant, Couleurs } from '../classes/combattant';
import {
  HttpClient,
  HttpHeaders,
  provideHttpClient,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CombattantsService {
  // ajoutCombattant: EventEmitter<Combattant> = new EventEmitter();

  listeCombattants = [
    {
      id: 1,
      prenom: 'Clement',
      nom: 'Calliau',
      pseudo: 'Makhai',
      club: 'Bec Escrime',
      couleur: Couleurs.Bleu,
    },
    {
      id: 2,
      prenom: 'Alex',
      nom: 'Goches',
      pseudo: 'Fiore',
      club: 'Bec Escrime',
      couleur: Couleurs.Rouge,
    },
  ] as Combattant[];
  constructor(private http: HttpClient) {}

  getCombattants(): Combattant[] {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    });
    let response = this.http.get('http://192.168.1.110:1080/second', {
      headers,
    });
    response.subscribe((_) => {
      console.log(_);
    });
    return this.listeCombattants;
  }

  ajouterCombattant(combattantAAjouter: Combattant): Combattant[] {
    this.listeCombattants.push(combattantAAjouter);
    // this.ajoutCombattant.emit(combattantAAjouter);
    console.log(combattantAAjouter);
    return this.listeCombattants;
  }
}
