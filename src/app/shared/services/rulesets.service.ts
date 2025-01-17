import { Injectable } from '@angular/core';
import { Ruleset } from '../models/ruleset';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RulesetsService {
  env = environment;
  URL = `${this.env.baseUrl}/rulesets`;

  constructor(private http: HttpClient) {}

  public getRulesets(): Observable<Ruleset[]> {
    return this.http.get<Ruleset[]>(this.URL, { responseType: 'json' });
  }

  public creerRuleset(rulesetACreer: Ruleset): Observable<Ruleset> {
    return this.http.post<Ruleset>(this.URL, rulesetACreer, {
      responseType: 'json',
    });
  }

  public modifierRuleset(rulesetAModifier: Ruleset): Observable<Ruleset> {
    return this.http.put<Ruleset>(
      `${this.URL}/${rulesetAModifier.id}`,
      rulesetAModifier,
      {
        responseType: 'json',
      }
    );
  }

  public supprimerRuleset(id: number): Observable<Object> {
    return this.http.delete(this.URL + '/' + id);
  }
}
