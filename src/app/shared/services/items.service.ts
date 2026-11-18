import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private http = inject(HttpClient);

  env = environment;
  URL = `${this.env.baseUrl}/items`;

  public getItems(type:string): Observable<Item[]> {
    const params = new HttpParams().set('type', type)
    return this.http.get<Item[]>(`${this.URL}`, {params});
  }

  public getItemsByListe(codes: string[]): Observable<Item[]> {
    return this.http.post<Item[]>(`${this.URL}/ruleset`, codes, {
      responseType: 'json',
    });
  }

  public ajouterItem(itemAAjouter: Item): Observable<Item> {
    return this.http.post<Item>(this.URL, itemAAjouter, {
      responseType: 'json',
    });
  }

  public creerItem(itemACreer: Item): Observable<Item> {
    return this.http.post<Item>(this.URL, itemACreer, {
      responseType: 'json',
    });
  }

  public modifierItem(itemAModifier: Item): Observable<Item> {
    return this.http.put<Item>(
      `${this.URL}/${itemAModifier.libelle}`,
      itemAModifier,
      {
        responseType: 'json',
      }
    );
  }

  public supprimerItem(id: number): Observable<object> {
    return this.http.delete(this.URL + '/' + id);
  }
}
