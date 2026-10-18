import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { PasswordModalComponent } from '../shared/modales/password-modal/password-modal.component';
import { LogService } from '../shared/services/log.service';
import { RolesNames } from '../shared/models/roles';

@Component({
  selector: 'app-login',
  imports: [PasswordModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
  private logService = inject(LogService);
  estModateSecuVisible = false;
  role: RolesNames | null;
  estLog: boolean | null;

  constructor() {
    this.estLog = Boolean(localStorage.getItem('estLog'));
    if (!this.estLog)
      this.logService.notificationLog$.subscribe(e => this.estLog = e);
    this.logService.notificationLog.next(this.estLog);

    this.role = localStorage.getItem('role') as RolesNames;
    if (!this.role)
      this.logService.notificationRole$.subscribe(e => this.role = e);
    this.logService.notificationRole.next(this.role);
  }

  ouvrirModaleSecu() {
    this.estModateSecuVisible = true;
  }

  fermerModaleSecu() {
    this.estModateSecuVisible = false;
  }

  deverouiller(role: RolesNames) {
    this.estModateSecuVisible = false;
    this.logService.notificationLog.next(true)
    this.logService.notificationRole.next(role);
    localStorage.setItem('estLog', "true")
    localStorage.setItem('role', role)
  }

  verouiller() {
    this.logService.notificationLog.next(false)
    this.logService.notificationRole.next('guest')
    localStorage.removeItem('estLog')
    localStorage.removeItem('role');
  }
}
