import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { InscritsService } from '../shared/services/inscrits.service';
import { Inscrit } from '../shared/models/inscrit';
import { InscritLigneComponent } from './inscrit-ligne/inscrit-ligne.component';
import { InscritEditerComponent } from './inscrit-editer/inscrit-editer.component';
import { Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LogService } from '../shared/services/log.service';

@Component({
    selector: 'app-inscrits',
    imports: [
        InscritLigneComponent,
        InscritEditerComponent,
        CommonModule,
    ],
    templateUrl: './inscrits.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './inscrits.component.css'
})
export class InscritsComponent implements OnInit {
  private logService = inject(LogService);
  private inscritsService = inject(InscritsService);

  inscritsListe?: Inscrit[];
  inscritsListe$?: Observable<Inscrit[]>;
  estModeCreation: boolean;
  nouveauInscrit: Inscrit;
  estLog = false;

  constructor() {
    this.estModeCreation = false;
    this.nouveauInscrit = new Inscrit();
  }

  ngOnInit(): void {
    this.logService.notificationLog$.subscribe(e => this.estLog = e)
    this.recupererInscrits();
  }

  modeAjout(): void {
    this.estModeCreation = true;
  }

  annulerEdition() {
    this.estModeCreation = false;
  }

  recupererInscrits() {
    this.inscritsListe$ = this.inscritsService.getInscrits();
  }

  creerInscrit() {
    this.inscritsListe$ = this.inscritsListe$?.pipe(
      tap(() => (this.estModeCreation = false))
    );
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
