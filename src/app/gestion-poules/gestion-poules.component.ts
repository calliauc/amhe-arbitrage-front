import { Component, OnInit } from '@angular/core';
import { Poule } from '../shared/models/poule';
import { TagCb } from '../shared/models/tag';
import { TagsService } from '../shared/services/tags.service';
import { Combattant } from '../shared/models/combattant';
import { AffichagePouleComponent } from './affichage-poule/affichage-poule.component';
import { PoulesService } from '../shared/services/poules.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-gestion-poules',
  standalone: true,
  imports: [AffichagePouleComponent, LoginComponent],
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

  updateLogin(lock: boolean) {
    this.estLectureSeule = lock;
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
    });
  }
}
