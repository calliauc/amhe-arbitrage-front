import { Component, OnInit } from '@angular/core';
import { Poule } from '../shared/models/poule';
import { Tag, TagCb } from '../shared/models/tag';
import { TagsService } from '../shared/services/tags.service';
import { CombattantsService } from '../shared/services/combattants.service';
import { Combattant } from '../shared/models/combattant';
import { AffichagePouleComponent } from './affichage-poule/affichage-poule.component';

@Component({
  selector: 'app-affichage-poules',
  standalone: true,
  imports: [AffichagePouleComponent],
  templateUrl: './affichage-poules.component.html',
  styleUrl: './affichage-poules.component.css',
})
export class AffichagePoulesComponent implements OnInit {
  description: string = '';
  tags: TagCb[] = [];
  poules: Poule[] = [];
  combattantsPoule: Combattant[] = [];
  estModeCreation: boolean = false;

  constructor(
    private tagsService: TagsService,
    private combattantsService: CombattantsService
  ) {}

  ngOnInit(): void {
    this.tagsService.getTags().subscribe((tags) => {
      tags.forEach((tag) =>
        this.tags.push({
          id: tag.id,
          code: tag.code,
          checked: false,
        })
      );
    });
  }

  onDescriptionChange($event: any) {
    this.description = $event.target.value;
  }

  onTagsChange($event: any) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;
    this.tags.forEach((tag) => {
      if (tag.id == id) {
        tag.checked = isChecked;
      }
    });
  }

  ajouterPoule() {
    let tagsPoule = this.tags.filter((tag) => tag.checked);
    let combattantsPoule: Combattant[] = [];
    this.combattantsService
      .getCombattantsByTagsMatchs(tagsPoule)
      .subscribe((c) => {
        combattantsPoule = c;
        let nouvellePoule = {
          tags: tagsPoule,
          description: this.description,
          combattants: combattantsPoule,
        };
        this.poules.push(nouvellePoule);
        console.log(this.poules);
      });
  }
}
