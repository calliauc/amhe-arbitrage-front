import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthV1Service } from '../shared/services/auth-v1.service';
import { RolesNames } from '../shared/models/roles';

@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit {
  private logService = inject(AuthV1Service);

  env = environment;
  role:RolesNames = 'guest';

  ngOnInit(): void {
    this.logService.notificationRole$.subscribe(e => this.role = e);
  }

  constructor(){
  }

}
