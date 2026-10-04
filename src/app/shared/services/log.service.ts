import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  notificationLog = new BehaviorSubject<boolean>(false);
  notification$ = this.notificationLog.asObservable();


}
