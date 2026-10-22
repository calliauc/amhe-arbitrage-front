import { Component, Input, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Item } from '../../shared/models/item';
import { RolesNames } from '../../shared/models/roles';
import { AuthV1Service } from '../../shared/services/auth-v1.service';
import { TagEditerComponent } from './tag-editer/tag-editer.component';
import { TagLigneComponent } from './tag-ligne/tag-ligne.component';
import { ItemsService } from '../../shared/services/items.service';

@Component({
    selector: 'app-gestion-tags',
    imports: [TagLigneComponent, TagEditerComponent, CommonModule],
    templateUrl: './gestion-tags.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './gestion-tags.component.css'
})
export class GestionTagsComponent implements OnInit {
  private Auth = AuthV1Service;
  private itemsService = inject(ItemsService);

  @Input() role!: RolesNames;

  tagsListe?: Item[];
  tagsListe$?: Observable<Item[]>;
  estModeCreation: boolean;
  nouveauTag: Item;

  constructor() {
    this.estModeCreation = false;
    this.nouveauTag = new Item();
  }

  ngOnInit(): void {
    this.recupererTags();
  }

  modeAjout(): void {
    this.estModeCreation = true;
  }

  annulerEdition() {
    this.estModeCreation = false;
  }

  recupererTags() {
    this.tagsListe$ = this.itemsService.getItems("tag");
  }

  creerTag() {
    this.tagsListe$ = this.tagsListe$?.pipe(
      tap(() => (this.estModeCreation = false))
    );
  }

  modifierTag(tagModifie: Item) {
    this.tagsListe$ = this.itemsService
      .modifierItem(tagModifie)
      .pipe(switchMap(() => this.itemsService.getItems("tag")));
  }

  supprimerTag(id: number) {
    this.itemsService.supprimerItem(id).subscribe(() => this.recupererTags());
  }
}
