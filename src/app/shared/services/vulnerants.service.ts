import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vulnerant } from '../models/vulnerant';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VulnerantsService {
  env = environment;
  URL = `${this.env.baseUrl}/vulnerants`;
  constructor(private http: HttpClient) {}

  public getVulnerants(): Observable<Vulnerant[]> {
    return this.http.get<Vulnerant[]>(this.URL, { responseType: 'json' });
  }

  ajouterVulnerant(vulnerantAAjouter: Vulnerant): Observable<Vulnerant> {
    return this.http.post<Vulnerant>(this.URL, vulnerantAAjouter, {
      responseType: 'json',
    });
  }

  public creerVulnerant(vulnerantACreer: Vulnerant): Observable<Vulnerant> {
    return this.http.post<Vulnerant>(this.URL, vulnerantACreer, {
      responseType: 'json',
    });
  }

  public modifierVulnerant(
    vulnerantAAjouter: Vulnerant
  ): Observable<Vulnerant> {
    return this.http.put<Vulnerant>(this.URL, vulnerantAAjouter, {
      responseType: 'json',
    });
  }

  public supprimerVulnerant(id: number): Observable<Object> {
    return this.http.delete(this.URL + '/' + id);
  }
}
