import { Component, Input, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { VulnerantLigneComponent } from './vulnerant-ligne/vulnerant-ligne.component';
import { VulnerantEditerComponent } from './vulnerant-editer/vulnerant-editer.component';
import { Item } from '../../shared/models/item';
import { RolesNames } from '../../shared/models/roles';
import { AuthV1Service } from '../../shared/services/auth-v1.service';
import { ItemsService } from '../../shared/services/items.service';

@Component({
    selector: 'app-gestion-vulnerants',
    imports: [VulnerantLigneComponent, VulnerantEditerComponent, CommonModule],
    templateUrl: './gestion-vulnerants.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './gestion-vulnerants.component.css'
})
export class GestionVulnerantsComponent implements OnInit {
  private Auth = AuthV1Service;
  private itemsService = inject(ItemsService);

  @Input() role!: RolesNames;

  vulnerantsListe?: Item[];
  vulnerantsListe$?: Observable<Item[]>;
  estModeCreation: boolean;
  nouveauVulnerant: Item;
  constructor() {
    this.estModeCreation = false;
    this.nouveauVulnerant = new Item();
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
    this.vulnerantsListe$ = this.itemsService.getItems("vulnerant");
  }

  creerVulnerant() {
    this.vulnerantsListe$ = this.vulnerantsListe$?.pipe(
      tap(() => (this.estModeCreation = false))
    );
  }

  modifierVulnerant(vulnerantModifie: Item) {
    this.vulnerantsListe$ = this.itemsService
      .modifierItem(vulnerantModifie)
      .pipe(switchMap(() => this.itemsService.getItems("vulnerant")));
  }

  supprimerVulnerant(id: number) {
    this.itemsService
      .supprimerItem(id)
      .subscribe(() => this.recupererVulnerants());
  }
}
