import { Component, OnInit, ChangeDetectionStrategy, inject, AfterContentChecked, AfterViewInit } from '@angular/core';
import { SecuModalComponent } from '../shared/modales/secu-modal/secu-modal.component';
import { LogService } from '../shared/services/log.service';

@Component({
    selector: 'app-login',
    imports: [SecuModalComponent],
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './login.component.css'
})
export class LoginComponent {
  estLog = false;
  estModateSecuVisible = false;
  private logService = inject(LogService);

  constructor() {
    this.estLog = JSON.parse(localStorage.getItem('estLog') as string)||false;
    this.logService.notificationLog.next(this.estLog)
    this.logService.notification$.subscribe(e => this.estLog = e)
  }

  ouvrirModaleSecu() {
    this.estModateSecuVisible = true;
  }

  fermerModaleSecu() {
    this.estModateSecuVisible = false;
  }

  deverouiller() {
    this.estModateSecuVisible = false;
    this.logService.notificationLog.next(true)
    localStorage.setItem('estLog', "true")
  }

  verouiller() {
    this.logService.notificationLog.next(false)
    localStorage.setItem('estLog', "false")
  }
}
