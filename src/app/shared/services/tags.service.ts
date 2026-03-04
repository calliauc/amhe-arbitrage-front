import { Injectable, inject } from '@angular/core';
import { Tag } from '../models/tag';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private http = inject(HttpClient);

  env = environment;
  URL = `${this.env.baseUrl}/tags`;

  public getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.URL, { responseType: 'json' });
  }

  public creerTag(tagACreer: Tag): Observable<Tag> {
    console.log(tagACreer);
    return this.http.post<Tag>(this.URL, tagACreer, {
      responseType: 'json',
    });
  }

  public modifierTag(tagAModifier: Tag): Observable<Tag> {
    return this.http.put<Tag>(`${this.URL}/${tagAModifier.id}`, tagAModifier, {
      responseType: 'json',
    });
  }

  public supprimerTag(id: number): Observable<object> {
    return this.http.delete(this.URL + '/' + id);
  }
}
