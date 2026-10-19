import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthV1Service } from '../shared/services/auth-v1.service';

@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit {
  private logService = inject(AuthV1Service);

  env = environment;
  estLog = false;

  ngOnInit(): void {
    this.logService.notificationLog$.subscribe(e => this.estLog = e)
  }

  constructor(){
  }

}
