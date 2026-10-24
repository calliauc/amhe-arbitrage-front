import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Individu } from '../models/individu';

@Injectable({
  providedIn: 'root',
})
export class IndividuService {
  private http = inject(HttpClient);

  env = environment;
  URL = `${this.env.baseUrl}/individus`;

  public getIndividus(): Observable<Individu[]> {
    return this.http.get<Individu[]>(this.URL, { responseType: 'json' });
  }

  public getIndividuById(id: number): Observable<Individu> {
    return this.http.get<Individu>(`${this.URL}/${id}`, {
      responseType: 'json',
    });
  }

  public searchIndividuByName(nom: string): Observable<Individu[]> {
    return this.http.post<Individu[]>(`${this.URL}/recherche/nom`, nom, {
      responseType: 'json',
    });
  }

  public creerIndividu(individuACreer: Individu): Observable<Individu> {
    return this.http.post<Individu>(this.URL, individuACreer, {
      responseType: 'json',
    });
  }

  public modifierIndividu(
    individuAModifier: Individu
  ): Observable<Individu> {
    return this.http.put<Individu>(
      `${this.URL}`,
      individuAModifier,
      {
        responseType: 'json',
      }
    );
  }

  public supprimerIndividu(id: number): Observable<object> {
    return this.http.delete(this.URL + '/' + id);
  }
}
