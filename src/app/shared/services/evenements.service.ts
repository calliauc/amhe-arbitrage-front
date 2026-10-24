import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Item } from '../models/item';
import { Evenement } from '../models/evenement';

@Injectable({
  providedIn: 'root',
})
export class EvenementsService {
  private http = inject(HttpClient);
  refreshEvent = new BehaviorSubject<Evenement>(JSON.parse(localStorage.getItem('event') || "{\"id\":0}") as Evenement);
  refreshEvent$ = this.refreshEvent.asObservable();

  env = environment;
  URL = `${this.env.baseUrl}/evenements`;

  public getEvenements(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(this.URL, { responseType: 'json' });
  }

  public getEvenementById(id: number): Observable<Evenement> {
    return this.http.get<Evenement>(`${this.URL}/${id}`, {
      responseType: 'json',
    });
  }

  public refreshCacheEvent(event: Evenement) {
      localStorage.setItem('event', JSON.stringify(event));
      this.refreshEvent.next(event);
  }

  public searchEvenementByName(nom: string): Observable<Evenement[]> {
    return this.http.post<Evenement[]>(`${this.URL}/recherche/nom`, nom, {
      responseType: 'json',
    });
  }

  public getEvenementsByItemsMatchs(items: Item[]): Observable<Evenement[]> {
    const itemsId = items.map((item) => item.id);
    return this.http.post<Evenement[]>(`${this.URL}/items`, itemsId, {
      responseType: 'json',
    });
  }

  public creerEvenement(evenementACreer: Evenement): Observable<Evenement> {
    return this.http.post<Evenement>(this.URL, evenementACreer, {
      responseType: 'json',
    });
  }

  public inscrire(idEvenement: number, idIndividu: number): Observable<Evenement> {
    return this.http.put<Evenement>(`${this.URL}/${idEvenement}/inscrire`, [idIndividu], {
      responseType: 'json',
    });
  }

  public modifierEvenement(
    evenementAModifier: Evenement
  ): Observable<Evenement> {
    return this.http.put<Evenement>(
      `${this.URL}/${evenementAModifier.id}`,
      evenementAModifier,
      {
        responseType: 'json',
      }
    );
  }

  public supprimerEvenement(id: number): Observable<object> {
    return this.http.delete(this.URL + '/' + id);
  }
}
