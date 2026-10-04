import { Injectable, inject } from '@angular/core';
import { Match } from '../models/match';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NouveauMatch } from '../models/nouveau-match';
import { environment } from '../../../environments/environment';
import { CriteresRechercheMatch } from '../models/criteresRechercheMatch';

@Injectable({
  providedIn: 'root',
})
export class MatchsService {
  private http = inject(HttpClient);

  env = environment;
  URL = `${this.env.baseUrl}/matchs`;

  public getMatchs(): Observable<Match[]> {
    return this.http.get<Match[]>(this.URL, { responseType: 'json' });
  }

  public getMatchById(id: number): Observable<Match> {
    return this.http.get<Match>(`${this.URL}/${id}`, {
      responseType: 'json',
    });
  }

  public rechercherMatch(criteres: CriteresRechercheMatch): Observable<Match[]> {
    console.log('Recherche de match : ' + criteres);
    return this.http.post<Match[]>(`${this.URL}/recherche`, criteres, {
      responseType: 'json',
    });
  }


  public creerMatch(matchACreer: NouveauMatch): Observable<Match> {
    matchACreer.dateCreation.setHours(matchACreer.dateCreation.getHours() + 1);
    console.log('Service creation : ' + matchACreer.dateCreation);
    return this.http.post<Match>(this.URL, matchACreer, {
      responseType: 'json',
    });
  }

  public modifierDateDebutMatch(
    id: number,
    dateDebut: Date
  ): Observable<object> {
    dateDebut.setHours(dateDebut.getHours() + 1);
    const dateString = dateDebut.toISOString().slice(0, -5);
    return this.http.put(
      `${this.URL}/partial/${id}?dateDebut=${dateString}&statut=en cours`,
      null
    );
  }

  public modifierDateFinMatch(
    id: number,
    dateFin: Date,
    timer: number
  ): Observable<object> {
    dateFin.setHours(dateFin.getHours() + 1);
    const dateString = dateFin.toISOString().slice(0, -5);
    return this.http.put(
      `${this.URL}/partial/${id}?dateFin=${dateString}&timer=${timer}&statut=fini`,
      null
    );
  }

  public modifierTimerMatch(id: number, timer: number): Observable<object> {
    return this.http.put(
      `${this.URL}/partial/${id}?timer=${timer}&statut=en cours`,
      null
    );
  }

  public modifierScoreAMatch(id: number, scoreA: number): Observable<object> {
    return this.http.put(`${this.URL}/partial/${id}?scoreA=${scoreA}`, null);
  }

  public modifierScoreBMatch(id: number, scoreB: number): Observable<object> {
    return this.http.put(`${this.URL}/partial/${id}?scoreB=${scoreB}`, null);
  }

  public modifierStatutMatch(id: number, statut: string): Observable<object> {
    return this.http.put(`${this.URL}/partial/${id}?statut=${statut}`, null);
  }

  public supprimerMatch(id: number): Observable<object> {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
