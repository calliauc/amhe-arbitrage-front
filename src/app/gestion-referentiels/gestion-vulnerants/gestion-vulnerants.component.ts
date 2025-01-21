import { Component, OnInit } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { VulnerantsService } from '../../shared/services/vulnerants.service';
import { VulnerantLigneComponent } from './vulnerant-ligne/vulnerant-ligne.component';
import { VulnerantEditerComponent } from './vulnerant-editer/vulnerant-editer.component';
import { RulesetRef } from '../../shared/models/ruleset-ref';

@Component({
  selector: 'app-gestion-vulnerants',
  standalone: true,
  imports: [VulnerantLigneComponent, VulnerantEditerComponent, CommonModule],
  templateUrl: './gestion-vulnerants.component.html',
  styleUrl: './gestion-vulnerants.component.css',
})
export class GestionVulnerantsComponent implements OnInit {
  vulnerantsListe?: RulesetRef[];
  vulnerantsListe$?: Observable<RulesetRef[]>;
  estModeCreation: boolean;
  nouveauVulnerant: RulesetRef;
  constructor(private vulnerantsService: VulnerantsService) {
    this.estModeCreation = false;
    this.nouveauVulnerant = new RulesetRef();
  }

  ngOnInit(): void {
    this.recupererVulnerants();
  }

  modeAjout(): void {
    this.estModeCreation = true;
  }

  annulerEdition() {
    this.estModeCreation = false;
  }

  recupererVulnerants() {
    this.vulnerantsListe$ = this.vulnerantsService.getVulnerants();
  }

  creerVulnerant(vulnerantCree: RulesetRef) {
    this.vulnerantsListe$ = this.vulnerantsListe$?.pipe(
      tap((liste) => (this.estModeCreation = false))
    );
  }

  modifierVulnerant(vulnerantModifie: RulesetRef) {
    this.vulnerantsListe$ = this.vulnerantsService
      .modifierVulnerant(vulnerantModifie)
      .pipe(switchMap((_) => this.vulnerantsService.getVulnerants()));
  }

  supprimerVulnerant(code: string) {
    this.vulnerantsService
      .supprimerVulnerant(code)
      .subscribe(() => this.recupererVulnerants());
  }
}
