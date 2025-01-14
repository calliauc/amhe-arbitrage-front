import { EventEmitter, Injectable, Output } from '@angular/core';
import { Coup } from '../models/coup';
import { Observable, Subject } from 'rxjs';
import { NouveauCoup } from '../models/nouveau-coup';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CoupsService {
  notificationCoup = new Subject<boolean>();
  notification$ = this.notificationCoup.asObservable();
  URL: string = 'http://localhost:8080/coups';
  constructor(private http: HttpClient) {}

  public getCoups(): Observable<Coup[]> {
    return this.http.get<Coup[]>(this.URL, { responseType: 'json' });
  }

  public getCoupsBymatch(match_id: number): Observable<Coup[]> {
    return this.http.get<Coup[]>(this.URL, { responseType: 'json' });
  }

  public getCoupById(id: number): Observable<Coup> {
    return this.http.put<Coup>(`${this.URL}/${id}`, {
      responseType: 'json',
    });
  }

  public creerCoup(coupACreer: NouveauCoup): Observable<Coup> {
    console.log('creation', coupACreer);
    return this.http.post<Coup>(this.URL, coupACreer, {
      responseType: 'json',
    });
  }

  public modifierCoup(id: number, coupAModifier: Coup): Observable<Coup> {
    return this.http.put<Coup>(
      `${this.URL}/${coupAModifier.id}`,
      coupAModifier,
      {
        responseType: 'json',
      }
    );
  }

  public supprimerCoup(id: number): Observable<Object> {
    return this.http.delete(`${this.URL}/${id}`);
  }

  lireCoup(coup: Coup) {
    let coupStr: string = '';
    if (coup) {
      coupStr += coup.attaquantCouleur;
      coupStr += coup.vulnerant?.libelle;
      coupStr += coup.vulnerant.code != 'lutte' ? coup.cible?.libelle : '';
      coupStr += coup.defenseurCouleur;
    }
    return coupStr;
  }
}
