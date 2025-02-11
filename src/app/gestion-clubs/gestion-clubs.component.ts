import { Component, OnInit } from '@angular/core';
import { ClubsService } from '../shared/services/clubs.service';
import { Club } from '../shared/models/club';
import { ClubLigneComponent } from './club-ligne/club-ligne.component';
import { ClubEditerComponent } from './club-editer/club-editer.component';
import { Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SecuModalComponent } from '../shared/modales/secu-modal/secu-modal.component';

@Component({
  selector: 'app-gestion-clubs',
  standalone: true,
  imports: [
    ClubLigneComponent,
    ClubEditerComponent,
    CommonModule,
    SecuModalComponent,
  ],
  templateUrl: './gestion-clubs.component.html',
  styleUrl: './gestion-clubs.component.css',
})
export class GestionClubsComponent implements OnInit {
  clubsListe?: Club[];
  clubsListe$?: Observable<Club[]>;
  estModeCreation: boolean;
  nouveauClub: Club;
  estModateSecuVisible: boolean = false;
  estLectureSeule: boolean = true;

  constructor(private clubsService: ClubsService) {
    this.estModeCreation = false;
    this.nouveauClub = new Club();
  }

  ngOnInit(): void {
    this.recupererClubs();
    this.estLectureSeule = localStorage.getItem('secu') !== 'unlocked';
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

  creerClub(clubCree: Club) {
    this.clubsListe$ = this.clubsListe$?.pipe(
      tap((liste) => (this.estModeCreation = false))
    );
  }

  modifierClub(clubModifie: Club) {
    this.clubsListe$ = this.clubsService
      .modifierClub(clubModifie)
      .pipe(switchMap((_) => this.clubsService.getClubs()));
  }

  supprimerClub(id: number) {
    this.clubsService.supprimerClub(id).subscribe(() => this.recupererClubs());
  }

  ouvrirSecu() {
    this.estModateSecuVisible = true;
  }

  deverouiller() {
    this.estLectureSeule = false;
    this.estModateSecuVisible = false;
    localStorage.setItem('secu', 'unlocked');
  }

  annuler() {
    this.estModateSecuVisible = false;
  }

  stopModif() {
    this.estLectureSeule = true;
    localStorage.clear();
  }
}
