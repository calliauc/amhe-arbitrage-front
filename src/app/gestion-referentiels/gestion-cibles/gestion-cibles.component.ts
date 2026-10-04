import { Component, Input, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CibleLigneComponent } from './cible-ligne/cible-ligne.component';
import { Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CiblesService } from '../../shared/services/cibles.service';
import { CibleEditerComponent } from './cible-editer/cible-editer.component';
import { RulesetRef } from '../../shared/models/ruleset-ref';

@Component({
    selector: 'app-gestion-cibles',
    imports: [CibleLigneComponent, CibleEditerComponent, CommonModule],
    templateUrl: './gestion-cibles.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './gestion-cibles.component.css'
})
export class GestionCiblesComponent implements OnInit {
  private ciblesService = inject(CiblesService);

  @Input() estLog!: boolean;

  ciblesListe?: RulesetRef[];
  ciblesListe$?: Observable<RulesetRef[]>;
  estModeCreation: boolean;
  nouveauCible: RulesetRef;

  constructor() {
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

  creerCible() {
    this.ciblesListe$ = this.ciblesListe$?.pipe(
      tap(() => (this.estModeCreation = false))
    );
  }

  modifierCible(cibleModifie: RulesetRef) {
    this.ciblesListe$ = this.ciblesService
      .modifierCible(cibleModifie)
      .pipe(switchMap(() => this.ciblesService.getCibles()));
  }

  supprimerCible(code: string) {
    this.ciblesService
      .supprimerCible(code)
      .subscribe(() => this.recupererCibles());
  }
}
