import { Component, Input, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { TagLigneComponent } from './tag-ligne/tag-ligne.component';
import { Observable, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TagsService } from '../../shared/services/tags.service';
import { TagEditerComponent } from './tag-editer/tag-editer.component';
import { Tag } from '../../shared/models/tag';

@Component({
    selector: 'app-gestion-tags',
    imports: [TagLigneComponent, TagEditerComponent, CommonModule],
    templateUrl: './gestion-tags.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './gestion-tags.component.css'
})
export class GestionTagsComponent implements OnInit {
  private tagsService = inject(TagsService);

  @Input() estLectureSeule!: boolean;

  tagsListe?: Tag[];
  tagsListe$?: Observable<Tag[]>;
  estModeCreation: boolean;
  nouveauTag: Tag;

  constructor() {
    this.estModeCreation = false;
    this.nouveauTag = new Tag();
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
    this.tagsListe$ = this.tagsService.getTags();
  }

  creerTag() {
    this.tagsListe$ = this.tagsListe$?.pipe(
      tap(() => (this.estModeCreation = false))
    );
  }

  modifierTag(tagModifie: Tag) {
    this.tagsListe$ = this.tagsService
      .modifierTag(tagModifie)
      .pipe(switchMap(() => this.tagsService.getTags()));
  }

  supprimerTag(id: number) {
    this.tagsService.supprimerTag(id).subscribe(() => this.recupererTags());
  }
}
