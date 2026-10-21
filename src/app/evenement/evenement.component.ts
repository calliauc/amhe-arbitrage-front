import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { AuthV1Service } from '../shared/services/auth-v1.service';
import { Evenement } from '../shared/models/evenement';
import { EvenementsService } from '../shared/services/evenements.service';
import { InscritsComponent } from '../inscrits/inscrits.component';
import { GestionMatchsComponent } from '../gestion-matchs/gestion-matchs.component';
import { RolesNames } from '../shared/models/roles';
import { HemaRatingService } from '../shared/services/hema-rating.sevice';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-evenement',
  imports: [CommonModule, DatePipe],
  templateUrl: './evenement.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './evenement.component.css'
})
export class EvenementComponent {
  private Auth = AuthV1Service;
  private logService = inject(AuthV1Service);
  private evenementsService = inject(EvenementsService);
  private router = inject(Router);
  private hemaRatingService = inject(HemaRatingService);

  env = environment;
  URL_HEMA_RATING = `${this.env.baseUrl}/hema-rating/get-csv`;

  id!: number;
  evenement!: Evenement;
  role: RolesNames = 'guest';
  estScoresOk = false;


  constructor() {
    this.logService.notificationRole$.subscribe(e => {
      this.role = e
    });
    this.evenement = JSON.parse(localStorage.getItem('event') || "{\"id\":0}") as Evenement;
    console.log(this.evenement);    
    if(this.evenement.id == 0){
      localStorage.removeItem('origin-page');
      this.router.navigate(['evenements']);
    }
  }

  editerScores() {
    this.hemaRatingService
      .calculerResultats()
      .subscribe(() => (this.estScoresOk = true));
  }

  onListeEvenements() {
    this.router.navigate(['evenements']);
  }
}
