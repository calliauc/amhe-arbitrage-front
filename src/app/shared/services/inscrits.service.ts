import { Injectable, inject } from '@angular/core';
import { Inscrit } from '../models/inscrit';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Tag, TagsFiltres } from '../models/tag';
import { InscritDetails } from '../models/inscrit-details';

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


  public getInscritsByTagsMatchs(tags: Tag[]): Observable<Inscrit[]> {
    const tagsId = tags.map((tag) => tag.id);
    return this.http.post<Inscrit[]>(`${this.URL}/tags`, tagsId, {
      responseType: 'json',
    });
  }

  public getInscritsDetails(
    id: number,
    tags: TagsFiltres
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
