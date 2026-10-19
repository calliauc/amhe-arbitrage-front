import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { IndividuService } from '../shared/services/individus.service';
import { Individu } from '../shared/models/individu';
import { Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthV1Service } from '../shared/services/auth-v1.service';
import { AnnuaireLigneComponent } from './annuaire-ligne/annuaire-ligne.component';
import { AnnuaireEditerComponent } from './annuaire-editer/annuaire-editer.component';

@Component({
    selector: 'app-annuaire',
    imports: [
        AnnuaireLigneComponent,
        AnnuaireEditerComponent,
        CommonModule,
    ],
    templateUrl: './annuaire.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './annuaire.component.css'
})
export class AnnuaireComponent implements OnInit {
  private logService = inject(AuthV1Service);
  private individuService = inject(IndividuService);

  individusListe?: Individu[];
  individusListe$?: Observable<Individu[]>;
  estModeCreation: boolean;
  nouveauIndividu: Individu;
  estLog = false;

  constructor() {
    this.estModeCreation = false;
    this.nouveauIndividu = new Individu();
  }

  ngOnInit(): void {
    this.logService.notificationLog$.subscribe(e => this.estLog = e)
    this.recupererIndividus();
  }

  modeAjout(): void {
    this.estModeCreation = true;
  }

  annulerEdition() {
    this.estModeCreation = false;
  }

  recupererIndividus() {
    this.individusListe$ = this.individuService.getIndividus();
  }

  creerIndividu() {
    this.individusListe$ = this.individusListe$?.pipe(
      tap(() => (this.estModeCreation = false))
    );
  }

  modifierIndividu(individuModifie: Individu) {
    this.individusListe$ = this.individuService
      .modifierIndividu(individuModifie)
      .pipe(switchMap(() => this.individuService.getIndividus()));
  }

  supprimerIndividu(id: number) {
    this.individuService
      .supprimerIndividu(id)
      .subscribe(() => this.recupererIndividus());
  }
}
