import { Injectable } from '@angular/core';
import { Combattant } from '../models/combattant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root',
})
export class CombattantsService {
  env = environment;
  URL = `${this.env.baseUrl}/combattants`;
  constructor(private http: HttpClient) {}

  public getCombattants(): Observable<Combattant[]> {
    return this.http.get<Combattant[]>(this.URL, { responseType: 'json' });
  }

  public getCombattantById(id: number): Observable<Combattant> {
    return this.http.get<Combattant>(`${this.URL}/${id}`, {
      responseType: 'json',
    });
  }

  public getCombattantsByTagsMatchs(tags: Tag[]): Observable<Combattant[]> {
    let tagsId = tags.map((tag) => tag.id);
    return this.http.post<Combattant[]>(`${this.URL}/tags`, tagsId, {
      responseType: 'json',
    });
  }

  public creerCombattant(combattantACreer: Combattant): Observable<Combattant> {
    return this.http.post<Combattant>(this.URL, combattantACreer, {
      responseType: 'json',
    });
  }

  public modifierCombattant(
    combattantAModifier: Combattant
  ): Observable<Combattant> {
    return this.http.put<Combattant>(
      `${this.URL}/${combattantAModifier.id}`,
      combattantAModifier,
      {
        responseType: 'json',
      }
    );
  }

  public supprimerCombattant(id: number): Observable<Object> {
    return this.http.delete(this.URL + '/' + id);
  }
}
