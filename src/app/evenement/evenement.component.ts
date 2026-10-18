import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogService } from '../shared/services/log.service';
import { Evenement } from '../shared/models/evenement';
import { EvenementsService } from '../shared/services/evenements.service';
import { InscritsComponent } from '../inscrits/inscrits.component';
import { GestionMatchsComponent } from '../gestion-matchs/gestion-matchs.component';
import { RolesNames, auth } from '../shared/models/roles';

@Component({
  selector: 'app-evenement',
  imports: [CommonModule, DatePipe, InscritsComponent, InscritsComponent, GestionMatchsComponent],
  templateUrl: './evenement.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './evenement.component.css'
})
export class EvenementComponent implements OnInit {
  private logService = inject(LogService);
  private evenementsService = inject(EvenementsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  id!: number;
  evenement!: Evenement;
  estLog = false;
  role: RolesNames = 'guest';

  constructor() {
    this.route.params.subscribe((params) => {
      if (params['id'])
        this.id = params['id']
      else {
        this.id = Number(localStorage.getItem('event'));
      }
    });
  }

  ngOnInit(): void {
    this.logService.notificationLog$.subscribe(e => {
      this.estLog = e
      console.log("log : "+this.estLog);
    });
    this.logService.notificationRole$.subscribe(e => {
      this.role = e
      console.log("role : "+this.role);
    });
    if (this.id) {
      this.evenementsService.getEvenementById(this.id).subscribe(e => {
        this.evenement = e;
        localStorage.setItem('event', String(this.id));
      });
    } else{
      this.router.navigate(['evenements']);
    }
  }

  check():string {
    return this.role;
  }

  onListeEvenements() {
    this.router.navigate(['evenements']);
  }
}
