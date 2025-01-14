import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vulnerant } from '../models/vulnerant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VulnerantsService {
  URL: string = 'http://localhost:8080/vulnerants';
  constructor(private http: HttpClient) {}

  public getVulnerants(): Observable<Vulnerant[]> {
    return this.http.get<Vulnerant[]>(this.URL, { responseType: 'json' });
  }

  ajouterVulnerant(vulnerantAAjouter: Vulnerant): Observable<Vulnerant> {
    return this.http.post<Vulnerant>(this.URL, vulnerantAAjouter, {
      responseType: 'json',
    });
  }
}
