import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { SecuModalComponent } from '../shared/modales/secu-modal/secu-modal.component';
import { LogService } from '../shared/services/log.service';

@Component({
    selector: 'app-login',
    imports: [SecuModalComponent],
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  estLog = false;
  estModateSecuVisible = false;
  private logService = inject(LogService);

  ngOnInit(): void {
    console.log(this.estLog);
    this.estLog = JSON.parse(localStorage.getItem('estLog') as string)||false;
    console.log(this.estLog);
    this.logService.notificationLog.next(this.estLog)
    console.log(this.estLog);
    this.logService.notification$.subscribe(e => this.estLog = e)
    console.log(this.estLog);
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
