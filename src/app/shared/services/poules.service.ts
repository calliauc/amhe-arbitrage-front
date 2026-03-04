import { Injectable, inject } from '@angular/core';
import { Poule } from '../models/poule';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PoulesService {
  private http = inject(HttpClient);

  env = environment;
  URL = `${this.env.baseUrl}/poules`;

  public getPoules(): Observable<Poule[]> {
    return this.http.get<Poule[]>(this.URL, { responseType: 'json' });
  }

  public creerPoule(pouleACreer: Poule): Observable<Poule> {
    console.log(pouleACreer);
    return this.http.post<Poule>(this.URL, pouleACreer, {
      responseType: 'json',
    });
  }

  public modifierPoule(pouleAModifier: Poule): Observable<Poule> {
    return this.http.put<Poule>(
      `${this.URL}/${pouleAModifier.id}`,
      pouleAModifier,
      {
        responseType: 'json',
      }
    );
  }

  public supprimerPoule(id: number): Observable<object> {
    return this.http.delete(this.URL + '/' + id);
  }
}
