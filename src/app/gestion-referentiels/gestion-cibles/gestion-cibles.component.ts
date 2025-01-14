import { Component, OnInit } from '@angular/core';
import { CibleLigneComponent } from './cible-ligne/cible-ligne.component';
import { Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CiblesService } from '../../shared/services/cibles.service';
import { Cible } from '../../shared/models/cible';
import { CibleEditerComponent } from './cible-editer/cible-editer.component';

@Component({
  selector: 'app-gestion-cibles',
  standalone: true,
  imports: [CibleLigneComponent, CibleEditerComponent, CommonModule],
  templateUrl: './gestion-cibles.component.html',
  styleUrl: './gestion-cibles.component.css',
})
export class GestionCiblesComponent implements OnInit {
  ciblesListe?: Cible[];
  ciblesListe$?: Observable<Cible[]>;
  estModeCreation: boolean;
  nouveauCible: Cible;

  constructor(private ciblesService: CiblesService) {
    this.estModeCreation = false;
    this.nouveauCible = new Cible();
  }

  ngOnInit(): void {
    this.recupererCibles();
  }

  modeAjout(): void {
    this.estModeCreation = true;
  }

  annulerEdition() {
    this.estModeCreation = false;
  }

  recupererCibles() {
    this.ciblesListe$ = this.ciblesService.getCibles();
  }

  creerCible(cibleCree: Cible) {
    this.ciblesListe$ = this.ciblesListe$?.pipe(
      tap((liste) => (this.estModeCreation = false))
    );
  }

  modifierCible(cibleModifie: Cible) {
    this.ciblesListe$ = this.ciblesService
      .modifierCible(cibleModifie)
      .pipe(switchMap((_) => this.ciblesService.getCibles()));
  }

  supprimerCible(id: number) {
    this.ciblesService
      .supprimerCible(id)
      .subscribe(() => this.recupererCibles());
  }
}
