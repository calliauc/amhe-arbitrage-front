import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuMobileService {
  pageActuelle = new Subject<string>();
  pageActuelle$ = this.pageActuelle.asObservable();
}
