import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { EvenementsService } from '../shared/services/evenements.service';
import { Evenement } from '../shared/models/evenement';
import { EvenementLigneComponent } from './evenement-ligne/evenement-ligne.component';
import { EvenementEditerComponent } from './evenement-editer/evenement-editer.component';
import { Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthV1Service } from '../shared/services/auth-v1.service';

@Component({
    selector: 'app-evenements',
    imports: [
        EvenementLigneComponent,
        EvenementEditerComponent,
        CommonModule,
    ],
    templateUrl: './evenements.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './evenements.component.css'
})
export class EvenementsComponent implements OnInit {
  private logService = inject(AuthV1Service);
  private evenementsService = inject(EvenementsService);

  evenementsListe?: Evenement[];
  evenementsListe$?: Observable<Evenement[]>;
  estModeCreation: boolean;
  nouveauEvenement: Evenement;
  estLog = false;

  constructor() {
    this.estModeCreation = false;
    this.nouveauEvenement = new Evenement();
  }

  ngOnInit(): void {
    this.logService.notificationLog$.subscribe(e => this.estLog = e)
    this.recupererEvenements();
  }

  modeAjout(): void {
    this.estModeCreation = true;
  }

  annulerEdition() {
    this.estModeCreation = false;
  }

  recupererEvenements() {
    this.evenementsListe$ = this.evenementsService.getEvenements();
  }

  creerEvenement() {
    this.evenementsListe$ = this.evenementsListe$?.pipe(
      tap(() => (this.estModeCreation = false))
    );
  }

  modifierEvenement(evenementModifie: Evenement) {
    this.evenementsListe$ = this.evenementsService
      .modifierEvenement(evenementModifie)
      .pipe(switchMap(() => this.evenementsService.getEvenements()));
  }

  supprimerEvenement(id: number) {
    this.evenementsService
      .supprimerEvenement(id)
      .subscribe(() => this.recupererEvenements());
  }
}
