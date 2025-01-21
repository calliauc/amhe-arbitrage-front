import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RulesetRef } from '../models/ruleset-ref';

@Injectable({
  providedIn: 'root',
})
export class VulnerantsService {
  env = environment;
  URL = `${this.env.baseUrl}/vulnerants`;
  constructor(private http: HttpClient) {}

  public getVulnerants(): Observable<RulesetRef[]> {
    return this.http.get<RulesetRef[]>(this.URL, { responseType: 'json' });
  }

  public getVulnerantsByListe(codes: string[]): Observable<RulesetRef[]> {
    return this.http.post<RulesetRef[]>(`${this.URL}/ruleset`, codes, {
      responseType: 'json',
    });
  }

  ajouterVulnerant(vulnerantAAjouter: RulesetRef): Observable<RulesetRef> {
    return this.http.post<RulesetRef>(this.URL, vulnerantAAjouter, {
      responseType: 'json',
    });
  }

  public creerVulnerant(vulnerantACreer: RulesetRef): Observable<RulesetRef> {
    return this.http.post<RulesetRef>(this.URL, vulnerantACreer, {
      responseType: 'json',
    });
  }

  public modifierVulnerant(
    vulnerantAModifier: RulesetRef
  ): Observable<RulesetRef> {
    return this.http.put<RulesetRef>(
      `${this.URL}/${vulnerantAModifier.code}`,
      vulnerantAModifier,
      {
        responseType: 'json',
      }
    );
  }

  public supprimerVulnerant(code: string): Observable<Object> {
    return this.http.delete(this.URL + '/' + code);
  }
}
