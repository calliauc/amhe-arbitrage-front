import { Component, OnInit } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { VulnerantsService } from '../../shared/services/vulnerants.service';
import { Vulnerant } from '../../shared/models/vulnerant';
import { VulnerantLigneComponent } from './vulnerant-ligne/vulnerant-ligne.component';
import { VulnerantEditerComponent } from './vulnerant-editer/vulnerant-editer.component';

@Component({
  selector: 'app-gestion-vulnerants',
  standalone: true,
  imports: [VulnerantLigneComponent, VulnerantEditerComponent, CommonModule],
  templateUrl: './gestion-vulnerants.component.html',
  styleUrl: './gestion-vulnerants.component.css',
})
export class GestionVulnerantsComponent implements OnInit {
  vulnerantsListe?: Vulnerant[];
  vulnerantsListe$?: Observable<Vulnerant[]>;
  estModeCreation: boolean;
  nouveauVulnerant: Vulnerant;
  constructor(private vulnerantsService: VulnerantsService) {
    this.estModeCreation = false;
    this.nouveauVulnerant = new Vulnerant();
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

  creerVulnerant(vulnerantCree: Vulnerant) {
    this.vulnerantsListe$ = this.vulnerantsListe$?.pipe(
      tap((liste) => (this.estModeCreation = false))
    );
  }

  modifierVulnerant(vulnerantModifie: Vulnerant) {
    this.vulnerantsListe$ = this.vulnerantsService
      .modifierVulnerant(vulnerantModifie)
      .pipe(switchMap((_) => this.vulnerantsService.getVulnerants()));
  }

  supprimerVulnerant(id: number) {
    this.vulnerantsService
      .supprimerVulnerant(id)
      .subscribe(() => this.recupererVulnerants());
  }
}
