import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RulesetRef } from '../models/ruleset-ref';

@Injectable({
  providedIn: 'root',
})
export class CiblesService {
  private http = inject(HttpClient);

  env = environment;
  URL = `${this.env.baseUrl}/cibles`;

  public getCibles(): Observable<RulesetRef[]> {
    return this.http.get<RulesetRef[]>(this.URL, { responseType: 'json' });
  }

  public getCiblesByListe(codes: string[]): Observable<RulesetRef[]> {
    return this.http.post<RulesetRef[]>(`${this.URL}/ruleset`, codes, {
      responseType: 'json',
    });
  }

  public ajouterCible(cibleAAjouter: RulesetRef): Observable<RulesetRef> {
    return this.http.post<RulesetRef>(this.URL, cibleAAjouter, {
      responseType: 'json',
    });
  }

  public creerCible(cibleACreer: RulesetRef): Observable<RulesetRef> {
    return this.http.post<RulesetRef>(this.URL, cibleACreer, {
      responseType: 'json',
    });
  }

  public modifierCible(cibleAModifier: RulesetRef): Observable<RulesetRef> {
    return this.http.put<RulesetRef>(
      `${this.URL}/${cibleAModifier.code}`,
      cibleAModifier,
      {
        responseType: 'json',
      }
    );
  }

  public supprimerCible(code: string): Observable<object> {
    return this.http.delete(this.URL + '/' + code);
  }
}
