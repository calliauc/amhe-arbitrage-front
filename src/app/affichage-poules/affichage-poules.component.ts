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
    this.setDefaultData();
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

  entrerModeCreation() {
    this.estModeCreation = true;
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
    this.estModeCreation = false;
  }

  supprimerPoule(position: number) {
    this.poules.splice(position, 1);
  }

  setDefaultData() {
    this.poules.push({
      tags: [
        {
          id: 1,
          code: 'Poule A',
        },
        {
          id: 4,
          code: 'Longsword',
        },
        {
          id: 5,
          code: 'B-CUP-1',
        },
      ],
      description: 'Poule A',
      combattants: [
        {
          id: 1,
          nom: 'Calliau',
          prenom: 'Clement',
          pseudo: 'Makhai',
          club: {
            id: 1,
            nomCourt: 'BEC',
            nomComplet: 'BEC Escrime',
            ville: 'Bordeaux',
          },
        },
        {
          id: 2,
          nom: 'Goches',
          prenom: 'Alex',
          pseudo: 'Walter',
          club: {
            id: 1,
            nomCourt: 'BEC',
            nomComplet: 'BEC Escrime',
            ville: 'Bordeaux',
          },
        },
        {
          id: 3,
          nom: 'Le Bras',
          prenom: 'Damien',
          pseudo: 'Hache',
          club: {
            id: 2,
            nomCourt: 'Mesnie',
            nomComplet: 'La Mesnie du Blanc Castel',
            ville: 'Blanquefort',
          },
        },
      ],
    });
  }
}
