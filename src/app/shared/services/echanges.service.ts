import { Injectable, inject } from '@angular/core';
import { Echange, EchangeTempApi } from '../models/echange';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EchangesService {
  private http = inject(HttpClient);

  env = environment;
  URL = `${this.env.baseUrl}/echanges`;
  notificationEchange = new Subject<Echange>();
  notification$ = this.notificationEchange.asObservable();

  public getEchanges(): Observable<Echange[]> {
    return this.http.get<Echange[]>(this.URL, { responseType: 'json' });
  }

  public getEchangesByMatch(match_id: number): Observable<Echange[]> {
    return this.http.get<Echange[]>(`${this.URL}/match/${match_id}`, {
      responseType: 'json',
    });
  }

  public getEchangeById(id: number): Observable<Echange> {
    return this.http.put<Echange>(`${this.URL}/${id}`, {
      responseType: 'json',
    });
  }

  public creerEchange(echangeACreer: EchangeTempApi): Observable<Echange> {
    return this.http.post<Echange>(this.URL, echangeACreer, {
      responseType: 'json',
    });
  }

  public modifierEchange(id: number, echangeAModifier: Echange): Observable<Echange> {
    return this.http.put<Echange>(
      `${this.URL}/${echangeAModifier.id}`,
      echangeAModifier,
      {
        responseType: 'json',
      }
    );
  }

  public supprimerEchange(id: number): Observable<object> {
    return this.http.delete(`${this.URL}/${id}`);
  }

  lireEchange(echange: Echange) {
    console.log(echange);

    let echangeStr = '';
    if (echange) {
      echangeStr+="todo lol";
      // echangeStr += echange.attaquantCouleur;
      // echangeStr += echange.vulnerant?.libelle;
      // echangeStr += echange.vulnerant.code != 'lutte' ? echange.cible?.libelle : '';
      // echangeStr += echange.defenseurCouleur;
    }
    return echangeStr;
  }
}
