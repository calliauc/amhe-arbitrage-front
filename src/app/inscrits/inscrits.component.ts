import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { InscritsService } from '../shared/services/inscrits.service';
import { Inscrit } from '../shared/models/inscrit';
import { InscritLigneComponent } from './inscrit-ligne/inscrit-ligne.component';
import { InscritEditerComponent } from './inscrit-editer/inscrit-editer.component';
import { Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthV1Service } from '../shared/services/auth-v1.service';
import { Evenement } from '../shared/models/evenement';
import { EvenementsService } from '../shared/services/evenements.service';
import { Router } from '@angular/router';
import { RolesNames } from '../shared/models/roles';
import { InscriptionComponent } from './inscription/inscription.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-inscrits',
    imports: [
        InscritLigneComponent,
        InscriptionComponent,
        CommonModule
    ],
    templateUrl: './inscrits.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './inscrits.component.css'
})
export class InscritsComponent implements OnInit {
  private logService = inject(AuthV1Service);
  private inscritsService = inject(InscritsService);
  private evenementsService = inject(EvenementsService);
  private router = inject(Router);

  evenement!:Evenement;
  inscritsListe$?: Observable<Inscrit[]>;
  estModeCreation = false;
  nouveauInscrit= new Inscrit();
  role:RolesNames = 'guest';

  constructor() {
    this.evenement = JSON.parse(localStorage.getItem('event') || '') as Evenement || new Evenement;
    console.log(this.evenement);
    if(!this.evenement.id){
      localStorage.setItem('origin-page', 'inscrits');
      this.router.navigate(['evenements']);
    }
  }

  ngOnInit(): void {
    this.evenementsService.getEvenementById(this.evenement!.id).subscribe(e => this.evenement = e);
    this.recupererInscrits();
    this.logService.notificationRole$.subscribe(e => this.role = e)
  }

  recupererInscrits() {
    this.inscritsListe$ = this.inscritsService.getInscritsByEvent(this.evenement.id);
  }

  creerInscrit() {
    this.inscritsListe$ = this.inscritsListe$?.pipe(
      tap(() => (this.estModeCreation = false))
    );
  }

  modeAjout(): void {
    this.estModeCreation = true;
  }

  annulerEdition() {
    this.estModeCreation = false;
  }

  modifierInscrit(inscritModifie: Inscrit) {
    this.inscritsListe$ = this.inscritsService
      .modifierInscrit(inscritModifie)
      .pipe(switchMap(() => this.inscritsService.getInscrits()));
  }

  supprimerInscrit(id: number) {
    this.inscritsService
      .supprimerInscrit(id)
      .subscribe(() => this.recupererInscrits());
  }
}
