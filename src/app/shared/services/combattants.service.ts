import { Injectable } from '@angular/core';
import { Combattant } from '../models/combattant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CombattantsService {
  URL: string = 'http://localhost:8080/combattants';
  listeCombattants = [] as Combattant[];
  constructor(private http: HttpClient) {}

  public getCombattants(): Observable<Combattant[]> {
    this.listeCombattants = [];
    return this.http.get<Combattant[]>(this.URL, { responseType: 'json' });
  }

  public creerCombattant(combattantACreer: Combattant): Observable<Combattant> {
    return this.http.post<Combattant>(this.URL, combattantACreer, {
      responseType: 'json',
    });
  }

  public modifierCombattant(
    combattantAAjouter: Combattant
  ): Observable<Combattant> {
    return this.http.put<Combattant>(this.URL, combattantAAjouter, {
      responseType: 'json',
    });
  }

  public supprimerCombattant(id: number): Observable<Object> {
    return this.http.delete(this.URL + '/' + id);
  }
}
