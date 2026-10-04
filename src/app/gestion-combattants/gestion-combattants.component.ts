import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CombattantsService } from '../shared/services/combattants.service';
import { Combattant } from '../shared/models/combattant';
import { CombattantLigneComponent } from './combattant-ligne/combattant-ligne.component';
import { CombattantEditerComponent } from './combattant-editer/combattant-editer.component';
import { Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LogService } from '../shared/services/log.service';

@Component({
    selector: 'app-gestion-combattants',
    imports: [
        CombattantLigneComponent,
        CombattantEditerComponent,
        CommonModule,
    ],
    templateUrl: './gestion-combattants.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './gestion-combattants.component.css'
})
export class GestionCombattantsComponent implements OnInit {
  private logService = inject(LogService);
  private combattantsService = inject(CombattantsService);

  combattantsListe?: Combattant[];
  combattantsListe$?: Observable<Combattant[]>;
  estModeCreation: boolean;
  nouveauCombattant: Combattant;
  estLog = false;

  constructor() {
    this.estModeCreation = false;
    this.nouveauCombattant = new Combattant();
  }

  ngOnInit(): void {
    this.logService.notification$.subscribe(e => this.estLog = e)
    this.recupererCombattants();
  }

  modeAjout(): void {
    this.estModeCreation = true;
  }

  annulerEdition() {
    this.estModeCreation = false;
  }

  recupererCombattants() {
    this.combattantsListe$ = this.combattantsService.getCombattants();
  }

  creerCombattant() {
    this.combattantsListe$ = this.combattantsListe$?.pipe(
      tap(() => (this.estModeCreation = false))
    );
  }

  modifierCombattant(combattantModifie: Combattant) {
    this.combattantsListe$ = this.combattantsService
      .modifierCombattant(combattantModifie)
      .pipe(switchMap(() => this.combattantsService.getCombattants()));
  }

  supprimerCombattant(id: number) {
    this.combattantsService
      .supprimerCombattant(id)
      .subscribe(() => this.recupererCombattants());
  }
}
