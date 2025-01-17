import { Injectable } from '@angular/core';
import { Club } from '../models/club';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClubsService {
  env = environment;
  URL = `${this.env.baseUrl}/clubs`;

  constructor(private http: HttpClient) {}

  public getClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this.URL, { responseType: 'json' });
  }

  public creerClub(clubACreer: Club): Observable<Club> {
    return this.http.post<Club>(this.URL, clubACreer, {
      responseType: 'json',
    });
  }

  public modifierClub(clubAModifier: Club): Observable<Club> {
    return this.http.put<Club>(
      `${this.URL}/${clubAModifier.id}`,
      clubAModifier,
      {
        responseType: 'json',
      }
    );
  }

  public supprimerClub(id: number): Observable<Object> {
    return this.http.delete(this.URL + '/' + id);
  }
}
