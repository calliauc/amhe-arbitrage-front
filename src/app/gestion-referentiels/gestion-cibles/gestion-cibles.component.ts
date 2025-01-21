import { Component, OnInit } from '@angular/core';
import { CibleLigneComponent } from './cible-ligne/cible-ligne.component';
import { Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CiblesService } from '../../shared/services/cibles.service';
import { CibleEditerComponent } from './cible-editer/cible-editer.component';
import { RulesetRef } from '../../shared/models/ruleset-ref';

@Component({
  selector: 'app-gestion-cibles',
  standalone: true,
  imports: [CibleLigneComponent, CibleEditerComponent, CommonModule],
  templateUrl: './gestion-cibles.component.html',
  styleUrl: './gestion-cibles.component.css',
})
export class GestionCiblesComponent implements OnInit {
  ciblesListe?: RulesetRef[];
  ciblesListe$?: Observable<RulesetRef[]>;
  estModeCreation: boolean;
  nouveauCible: RulesetRef;

  constructor(private ciblesService: CiblesService) {
    this.estModeCreation = false;
    this.nouveauCible = new RulesetRef();
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

  creerCible(cibleCree: RulesetRef) {
    this.ciblesListe$ = this.ciblesListe$?.pipe(
      tap((liste) => (this.estModeCreation = false))
    );
  }

  modifierCible(cibleModifie: RulesetRef) {
    this.ciblesListe$ = this.ciblesService
      .modifierCible(cibleModifie)
      .pipe(switchMap((_) => this.ciblesService.getCibles()));
  }

  supprimerCible(code: string) {
    this.ciblesService
      .supprimerCible(code)
      .subscribe(() => this.recupererCibles());
  }
}
