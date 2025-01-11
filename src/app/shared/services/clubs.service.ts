import { Injectable } from '@angular/core';
import { Club } from '../models/club';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClubsService {
  URL: string = 'http://localhost:8080/clubs';
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
