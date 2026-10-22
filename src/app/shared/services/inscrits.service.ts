import { Injectable, inject } from '@angular/core';
import { Inscrit } from '../models/inscrit';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Item } from '../models/item';
import { InscritDetails } from '../models/inscrit-details';
import { TagFiltres } from '../models/tag';

@Injectable({
  providedIn: 'root',
})
export class InscritsService {
  private http = inject(HttpClient);

  env = environment;
  URL = `${this.env.baseUrl}/inscrits`;

  public getInscrits(): Observable<Inscrit[]> {
    return this.http.get<Inscrit[]>(this.URL, { responseType: 'json' });
  }

  public getInscritById(id: number): Observable<Inscrit> {
    return this.http.get<Inscrit>(`${this.URL}/${id}`, {
      responseType: 'json',
    });
  }

  public searchInscritByName(nom: string): Observable<Inscrit[]> {
    return this.http.post<Inscrit[]>(`${this.URL}/recherche/nom`, nom, {
      responseType: 'json',
    });
  }

  public getInscritsByEvent(idEvent: number): Observable<Inscrit[]> {
    return this.http.get<Inscrit[]>(`${this.URL}/event/${idEvent}`, {
      responseType: 'json',
    });
  }

  public getInscritsByItemsMatchs(items: Item[]): Observable<Inscrit[]> {
    const itemsId = items.map((item) => item.id);
    return this.http.post<Inscrit[]>(`${this.URL}/items`, itemsId, {
      responseType: 'json',
    });
  }

  public getInscritsDetails(
    id: number,
    tags: TagFiltres
  ): Observable<InscritDetails> {
    console.log(id);
    console.log(tags);
    return this.http.post<InscritDetails>(
      `${this.URL}/details/${id}`,
      tags,
      {
        responseType: 'json',
      }
    );
  }

  public creerInscrit(inscritACreer: Inscrit): Observable<Inscrit> {
    return this.http.post<Inscrit>(this.URL, inscritACreer, {
      responseType: 'json',
    });
  }

  public modifierInscrit(
    inscritAModifier: Inscrit
  ): Observable<Inscrit> {
    return this.http.put<Inscrit>(
      `${this.URL}/${inscritAModifier.id}`,
      inscritAModifier,
      {
        responseType: 'json',
      }
    );
  }

  public supprimerInscrit(id: number): Observable<object> {
    return this.http.delete(this.URL + '/' + id);
  }
}
