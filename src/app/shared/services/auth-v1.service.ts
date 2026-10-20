import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { auth, RolesNames } from '../models/roles';

@Injectable({
  providedIn: 'root',
})
export class AuthV1Service {
  notificationRole = new BehaviorSubject<RolesNames>(localStorage.getItem('role') as RolesNames);
  notificationRole$ = this.notificationRole.asObservable();

  public static noAuth(role: RolesNames):boolean{
    return auth[role]==0;
  }
  public static estArbitre(role: RolesNames):boolean{
    return auth[role]<=1;
  }
  public static estAdmin(role: RolesNames):boolean{
    return auth[role]<=2;
  }
}
