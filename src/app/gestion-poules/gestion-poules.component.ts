import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { Poule } from '../shared/models/poule';
import { TagCb } from '../shared/models/tag';
import { TagsService } from '../shared/services/tags.service';
import { Combattant } from '../shared/models/combattant';
import { AffichagePouleComponent } from './affichage-poule/affichage-poule.component';
import { PoulesService } from '../shared/services/poules.service';
import { LogService } from '../shared/services/log.service';

@Component({
    selector: 'app-gestion-poules',
    imports: [AffichagePouleComponent],
    templateUrl: './gestion-poules.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './gestion-poules.component.css'
})
export class GestionPoulesComponent implements OnInit {
  private logService = inject(LogService);
  private tagsService = inject(TagsService);
  private poulesService = inject(PoulesService);

  nom = '';
  tags: TagCb[] = [];
  poules: Poule[] = [];
  combattantsPoule: Combattant[] = [];
  estModeCreation = false;
  estModateSecuVisible = false;
  estLog = false;

  ngOnInit(): void {
    this.logService.notification$.subscribe(e => this.estLog = e);
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
    this.estLog = localStorage.getItem('secu') !== 'unlocked';
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
    const tagsPoule = this.tags.filter((tag) => tag.checked);
    if (tagsPoule.length == 0 || this.nom.length == 0) {
      alert('Il manque des informations');
      return;
    }
    const nouvellePoule = {
      nom: this.nom,
      tags: tagsPoule,
    } as Poule;
    this.poulesService.creerPoule(nouvellePoule).subscribe(() => {
      this.chargerPoules();
      this.estModeCreation = false;
    });
  }

  supprimerPoule(id: number) {
    this.poulesService
      .supprimerPoule(id)
      .subscribe(() => this.chargerPoules());
  }

  chargerPoules() {
    this.poulesService.getPoules().subscribe((poules) => {
      this.poules = poules;
    });
  }
}
