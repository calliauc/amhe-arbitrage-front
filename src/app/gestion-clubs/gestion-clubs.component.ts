import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { ClubsService } from '../shared/services/clubs.service';
import { Club } from '../shared/models/club';
import { ClubLigneComponent } from './club-ligne/club-ligne.component';
import { ClubEditerComponent } from './club-editer/club-editer.component';
import { Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LogService } from '../shared/services/log.service';

@Component({
    selector: 'app-gestion-clubs',
    imports: [
        ClubLigneComponent,
        ClubEditerComponent,
        CommonModule,
    ],
    templateUrl: './gestion-clubs.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './gestion-clubs.component.css'
})
export class GestionClubsComponent implements OnInit {
  private logService = inject(LogService);
  private clubsService = inject(ClubsService);

  clubsListe?: Club[];
  clubsListe$?: Observable<Club[]>;
  estModeCreation: boolean;
  nouveauClub: Club;
  estModateSecuVisible = false;
  estLog = false;

  constructor() {
    this.estModeCreation = false;
    this.nouveauClub = new Club();
  }

  ngOnInit(): void {
    this.logService.notification$.subscribe(e => this.estLog = e)
    this.recupererClubs();
  }

  modeAjout(): void {
    this.estModeCreation = true;
  }

  annulerEdition() {
    this.estModeCreation = false;
  }

  recupererClubs() {
    this.clubsListe$ = this.clubsService.getClubs();
  }

  creerClub() {
    this.clubsListe$ = this.clubsListe$?.pipe(
      tap(() => (this.estModeCreation = false))
    );
  }

  modifierClub(clubModifie: Club) {
    this.clubsListe$ = this.clubsService
      .modifierClub(clubModifie)
      .pipe(switchMap(() => this.clubsService.getClubs()));
  }

  supprimerClub(id: number) {
    this.clubsService.supprimerClub(id).subscribe(() => this.recupererClubs());
  }
}
