import { Component, Input, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Item } from '../../shared/models/item';
import { RolesNames } from '../../shared/models/roles';
import { AuthV1Service } from '../../shared/services/auth-v1.service';
import { ItemEditerComponent } from './item-editer/item-editer.component';
import { ItemLigneComponent } from './item-ligne/item-ligne.component';
import { ItemsService } from '../../shared/services/items.service';

@Component({
    selector: 'app-gestion-items',
    imports: [ItemLigneComponent, ItemEditerComponent, CommonModule],
    templateUrl: './gestion-items.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './gestion-items.component.css'
})
export class GestionItemsComponent implements OnInit {
  private Auth = AuthV1Service;
  private itemsService = inject(ItemsService);

  @Input() role!: RolesNames;
  @Input() type!: string;

  itemsListe?: Item[];
  itemsListe$?: Observable<Item[]>;
  estModeCreation: boolean;
  nouveauItem: Item;

  constructor() {
    this.estModeCreation = false;
    this.nouveauItem = new Item();
  }

  ngOnInit(): void {
    this.recupererItems();
  }

  modeAjout(): void {
    this.estModeCreation = true;
  }

  annulerEdition() {
    this.estModeCreation = false;
  }

  recupererItems() {
    this.itemsListe$ = this.itemsService.getItems(this.type);
  }

  creerItem() {
    this.itemsListe$ = this.itemsListe$?.pipe(
      tap(() => (this.estModeCreation = false))
    );
  }

  modifierItem(itemModifie: Item) {
    this.itemsListe$ = this.itemsService
      .modifierItem(itemModifie)
      .pipe(switchMap(() => this.itemsService.getItems("item")));
  }

  supprimerItem(id: number) {
    this.itemsService.supprimerItem(id).subscribe(() => this.recupererItems());
  }
}
