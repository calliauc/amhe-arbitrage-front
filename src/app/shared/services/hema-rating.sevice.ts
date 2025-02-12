import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HemaRatingService {
  env = environment;
  URL = `${this.env.baseUrl}/hema-rating`;

  constructor(private http: HttpClient) {}

  public calculerResultats(): Observable<boolean> {
    return this.http.get<boolean>(`${this.URL}/creer-csv`, {
      responseType: 'json',
    });
  }

  public obtenirResultats(): Observable<string> {
    return this.http.get<string>(`${this.URL}/get-csv`);
  }
}
