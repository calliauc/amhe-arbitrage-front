import { Component, Input, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CibleLigneComponent } from './cible-ligne/cible-ligne.component';
import { Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CibleEditerComponent } from './cible-editer/cible-editer.component';
import { Item } from '../../shared/models/item';
import { RolesNames } from '../../shared/models/roles';
import { AuthV1Service } from '../../shared/services/auth-v1.service';
import { ItemsService } from '../../shared/services/items.service';

@Component({
    selector: 'app-gestion-cibles',
    imports: [CibleLigneComponent, CibleEditerComponent, CommonModule],
    templateUrl: './gestion-cibles.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './gestion-cibles.component.css'
})
export class GestionCiblesComponent implements OnInit {
  private Auth = AuthV1Service;
  private itemsService = inject(ItemsService);

  @Input() role!: RolesNames;

  ciblesListe?: Item[];
  ciblesListe$?: Observable<Item[]>;
  estModeCreation: boolean;
  nouveauCible: Item;

  constructor() {
    this.estModeCreation = false;
    this.nouveauCible = new Item();
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
    this.ciblesListe$ = this.itemsService.getItems("cible");
  }

  creerCible() {
    this.ciblesListe$ = this.ciblesListe$?.pipe(
      tap(() => (this.estModeCreation = false))
    );
  }

  modifierCible(cibleModifie: Item) {
    this.ciblesListe$ = this.itemsService
      .modifierItem(cibleModifie)
      .pipe(switchMap(() => this.itemsService.getItems("cible")));
  }

  supprimerCible(id: number) {
    this.itemsService
      .supprimerItem(id)
      .subscribe(() => this.recupererCibles());
  }
}
