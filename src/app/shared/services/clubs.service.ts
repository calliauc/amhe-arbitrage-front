import { Injectable } from '@angular/core';
import { Club } from '../models/club';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClubsService {
  env = environment;
  URL = `${this.env.baseUrl}/combattants`;
  listeClubs = [] as Club[];
  constructor(private http: HttpClient) {}

  public getClubs() {
    this.listeClubs = [];
    this.http
      .get<Club[]>(this.URL, { responseType: 'json' })
      .subscribe((result) => {
        this.listeClubs.push(...result);
      });
    return this.listeClubs;
  }

  ajouterClub(clubAAjouter: Club): Club[] {
    this.http
      .post<Club>(this.URL, clubAAjouter, {
        responseType: 'json',
      })
      .subscribe((clubCree) => {
        this.listeClubs.push(clubCree);
      });
    return this.listeClubs;
  }
}
