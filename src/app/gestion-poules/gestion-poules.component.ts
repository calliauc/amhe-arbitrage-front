import { Component, OnInit } from '@angular/core';
import { Poule } from '../shared/models/poule';
import { Tag, TagCb } from '../shared/models/tag';
import { TagsService } from '../shared/services/tags.service';
import { CombattantsService } from '../shared/services/combattants.service';
import { Combattant } from '../shared/models/combattant';
import { AffichagePouleComponent } from './affichage-poule/affichage-poule.component';
import { PoulesService } from '../shared/services/poules.service';
import { SecuModalComponent } from '../shared/modales/secu-modal/secu-modal.component';

@Component({
  selector: 'app-gestion-poules',
  standalone: true,
  imports: [AffichagePouleComponent, SecuModalComponent],
  templateUrl: './gestion-poules.component.html',
  styleUrl: './gestion-poules.component.css',
})
export class GestionPoulesComponent implements OnInit {
  nom: string = '';
  tags: TagCb[] = [];
  poules: Poule[] = [];
  combattantsPoule: Combattant[] = [];
  estModeCreation: boolean = false;
  estModateSecuVisible: boolean = false;
  estLectureSeule: boolean = true;

  constructor(
    private tagsService: TagsService,
    private combattantsService: CombattantsService,
    private poulesService: PoulesService
  ) {}

  ngOnInit(): void {
    this.chargerPoules();
    this.tagsService.getTags().subscribe((tags) => {
      tags.forEach((tag) =>
        this.tags.push({
          id: tag.id,
          code: tag.code,
          checked: false,
        })
      );
    });
    this.estLectureSeule = localStorage.getItem('secu') !== 'unlocked';
  }

  entrerModeCreation() {
    this.estModeCreation = true;
  }

  onNomChange($event: any) {
    this.nom = $event.target.value;
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

  annulerAjout() {
    this.estModeCreation = false;
  }

  ajouterPoule() {
    let tagsPoule = this.tags.filter((tag) => tag.checked);
    if (tagsPoule.length == 0 || this.nom.length == 0) {
      alert('Il manque des informations');
      return;
    }
    let nouvellePoule = {
      nom: this.nom,
      tags: tagsPoule,
    } as Poule;
    this.poulesService.creerPoule(nouvellePoule).subscribe((_) => {
      this.chargerPoules();
      this.estModeCreation = false;
    });
  }

  supprimerPoule(id: number) {
    this.poulesService
      .supprimerPoule(id)
      .subscribe((_) => this.chargerPoules());
  }

  chargerPoules() {
    this.poulesService.getPoules().subscribe((poules) => {
      this.poules = poules;
      console.log(poules);
    });
  }

  ouvrirSecu() {
    this.estModateSecuVisible = true;
  }

  deverouiller() {
    this.estLectureSeule = false;
    this.estModateSecuVisible = false;
    localStorage.setItem('secu', 'unlocked');
  }
  annuler() {
    this.estModateSecuVisible = false;
  }

  stopModif() {
    this.estLectureSeule = true;
    localStorage.clear();
  }
}
