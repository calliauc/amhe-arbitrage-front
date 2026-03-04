import { Component, OnInit, inject } from '@angular/core';
import { CombattantsService } from '../shared/services/combattants.service';
import { Combattant } from '../shared/models/combattant';
import { CombattantLigneComponent } from './combattant-ligne/combattant-ligne.component';
import { CombattantEditerComponent } from './combattant-editer/combattant-editer.component';
import { Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';

@Component({
    selector: 'app-gestion-combattants',
    imports: [
        CombattantLigneComponent,
        CombattantEditerComponent,
        CommonModule,
        LoginComponent,
    ],
    templateUrl: './gestion-combattants.component.html',
    styleUrl: './gestion-combattants.component.css'
})
export class GestionCombattantsComponent implements OnInit {
  private combattantsService = inject(CombattantsService);

  combattantsListe?: Combattant[];
  combattantsListe$?: Observable<Combattant[]>;
  estModeCreation: boolean;
  nouveauCombattant: Combattant;
  estModateSecuVisible = false;
  estLectureSeule = true;

  constructor() {
    this.estModeCreation = false;
    this.nouveauCombattant = new Combattant();
  }

  ngOnInit(): void {
    this.recupererCombattants();
  }

  updateLogin(lock: boolean) {
    this.estLectureSeule = lock;
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
