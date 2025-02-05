import { Injectable } from '@angular/core';
import { Match } from '../models/match';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NouveauMatch } from '../models/nouveau-match';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MatchsService {
  env = environment;
  URL = `${this.env.baseUrl}/matchs`;
  listeMatchs = [] as Match[];
  constructor(private http: HttpClient) {}

  public getMatchs(): Observable<Match[]> {
    this.listeMatchs = [];
    return this.http.get<Match[]>(this.URL, { responseType: 'json' });
  }

  public getMatchById(id: number): Observable<Match> {
    return this.http.get<Match>(`${this.URL}/${id}`, {
      responseType: 'json',
    });
  }

  public creerMatch(matchACreer: NouveauMatch): Observable<Match> {
    console.log('Service creation : ' + matchACreer.dateCreation);
    return this.http.post<Match>(this.URL, matchACreer, {
      responseType: 'json',
    });
  }

  public modifierMatch(matchAModifier: Match): Observable<Match> {
    console.log('Modif match', matchAModifier);
    return this.http.put<Match>(
      `${this.URL}/${matchAModifier.id}`,
      matchAModifier,
      {
        responseType: 'json',
      }
    );
  }

  public modifierDateDebutMatch(
    id: number,
    dateDebut: Date
  ): Observable<Object> {
    let dateString = dateDebut.toISOString().slice(0, -5);
    return this.http.put(
      `${this.URL}/partial/${id}?dateDebut=${dateString}&statut=en cours`,
      null
    );
  }

  public modifierDateFinMatch(
    id: number,
    dateFin: Date,
    timer: Number
  ): Observable<Object> {
    let dateString = dateFin.toISOString().slice(0, -5);
    return this.http.put(
      `${this.URL}/partial/${id}?dateFin=${dateString}&timer=${timer}&statut=fini`,
      null
    );
  }

  public modifierTimerMatch(id: number, timer: number): Observable<Object> {
    return this.http.put(
      `${this.URL}/partial/${id}?timer=${timer}&statut=en cours`,
      null
    );
  }

  public modifierScoreAMatch(id: number, scoreA: number): Observable<Object> {
    return this.http.put(`${this.URL}/partial/${id}?scoreA=${scoreA}`, null);
  }

  public modifierScoreBMatch(id: number, scoreB: number): Observable<Object> {
    return this.http.put(`${this.URL}/partial/${id}?scoreB=${scoreB}`, null);
  }

  public modifierStatutMatch(id: number, statut: string): Observable<Object> {
    return this.http.put(`${this.URL}/partial/${id}?statut=${statut}`, null);
  }

  public supprimerMatch(id: number): Observable<Object> {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
