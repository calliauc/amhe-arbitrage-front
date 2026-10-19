import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { auth, RolesNames } from '../models/roles';

@Injectable({
  providedIn: 'root',
})
export class AuthV1Service {
  notificationLog = new BehaviorSubject<boolean>(Boolean(localStorage.getItem('estLog')));
  notificationLog$ = this.notificationLog.asObservable();
  notificationRole = new BehaviorSubject<RolesNames>(localStorage.getItem('role') as RolesNames);
  notificationRole$ = this.notificationRole.asObservable();

  public static estArbitre(role: RolesNames):boolean{
    return auth[role]<=1;
  }
  public static estAdmin(role: RolesNames):boolean{
    return auth[role]<=2;
  }
}
