import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RolesNames } from '../models/roles';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  notificationLog = new BehaviorSubject<boolean>(false);
  notificationLog$ = this.notificationLog.asObservable();
  notificationRole = new BehaviorSubject<RolesNames>('guest');
  notificationRole$ = this.notificationRole.asObservable();
}
