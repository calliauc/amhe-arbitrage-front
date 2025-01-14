import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cible } from '../models/cible';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CiblesService {
  env = environment;
  URL = `${this.env.baseUrl}/cibles`;
  constructor(private http: HttpClient) {}

  public getCibles(): Observable<Cible[]> {
    return this.http.get<Cible[]>(this.URL, { responseType: 'json' });
  }

  ajouterCible(cibleAAjouter: Cible): Observable<Cible> {
    return this.http.post<Cible>(this.URL, cibleAAjouter, {
      responseType: 'json',
    });
  }

  public creerCible(cibleACreer: Cible): Observable<Cible> {
    return this.http.post<Cible>(this.URL, cibleACreer, {
      responseType: 'json',
    });
  }

  public modifierCible(cibleAAjouter: Cible): Observable<Cible> {
    return this.http.put<Cible>(this.URL, cibleAAjouter, {
      responseType: 'json',
    });
  }

  public supprimerCible(id: number): Observable<Object> {
    return this.http.delete(this.URL + '/' + id);
  }
}
