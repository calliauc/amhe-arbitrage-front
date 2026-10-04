import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { LogService } from '../shared/services/log.service';

@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit {
  private logService = inject(LogService);

  env = environment;
  estLog = false;
 
  ngOnInit(): void {
    this.logService.notification$.subscribe(e => this.estLog = e)
  }
  
  constructor(){
  }

}
