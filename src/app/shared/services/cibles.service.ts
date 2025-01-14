import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cible } from '../models/cible';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CiblesService {
  URL: string = 'http://localhost:8080/cibles';
  constructor(private http: HttpClient) {}

  public getCibles(): Observable<Cible[]> {
    return this.http.get<Cible[]>(this.URL, { responseType: 'json' });
  }

  ajouterCible(cibleAAjouter: Cible): Observable<Cible> {
    return this.http.post<Cible>(this.URL, cibleAAjouter, {
      responseType: 'json',
    });
  }
}
