import { Injectable } from '@angular/core';
import { Match } from '../models/match';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NouveauMatch } from '../models/nouveau-match';

@Injectable({
  providedIn: 'root',
})
export class MatchsService {
  URL: string = 'http://localhost:8080/matchs';
  listeMatchs = [] as Match[];
  constructor(private http: HttpClient) {}

  public getMatchs(): Observable<Match[]> {
    this.listeMatchs = [];
    return this.http.get<Match[]>(this.URL, { responseType: 'json' });
  }

  public getMatchById(id: number): Observable<Match> {
    return this.http.get<Match>(`${this.URL}/${id}`);
  }

  public creerMatch(matchACreer: NouveauMatch): Observable<Match> {
    return this.http.post<Match>(this.URL, matchACreer, {
      responseType: 'json',
    });
  }

  public modifierMatch(id: number, matchAModifier: Match): Observable<Match> {
    return this.http.put<Match>(
      `${this.URL}/${matchAModifier.id}`,
      matchAModifier,
      {
        responseType: 'json',
      }
    );
  }

  public supprimerMatch(id: number): Observable<Object> {
    return this.http.delete(this.URL + '/' + id);
  }
}
