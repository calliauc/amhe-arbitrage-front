import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { Poule } from '../shared/models/poule';
import { Inscrit } from '../shared/models/inscrit';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { PoulesService } from '../shared/services/poules.service';
import { LogService } from '../shared/services/log.service';
import { ActivatedRoute } from '@angular/router';
import { NomsPipe } from '../shared/pipes/noms.pipe';

@Component({
    selector: 'app-gestion-poules',
    imports: [CdkDrag, NomsPipe, CdkDropListGroup, CdkDropList],
    templateUrl: './gestion-poules.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './gestion-poules.component.css'
})
export class GestionPoulesComponent implements OnInit {
  private logService = inject(LogService);
  // private tagsService = inject(TagsService);
  private poulesService = inject(PoulesService);
  private route = inject(ActivatedRoute);

  id!:number;
  poules: Poule[] = [];
  estModeCreation = false;
  estLog = false;

    constructor() {
    this.route.params.subscribe((params) => {
      if (params['id'])
        this.id = params['id']
      else {
        this.id = JSON.parse(localStorage.getItem('event') as string)||false;
      }
    });
  }

  ngOnInit(): void {
    this.logService.notification$.subscribe(e => this.estLog = e);
    if (this.id)
      this.poulesService.getPoulesByEvent(this.id).subscribe(poules => {
    console.log(poules);
    this.poules = poules;
  console.log(this.poules);
  });
    else {
      this.poulesService.getPoules().subscribe(poules => this.poules = poules);
    }
  }

  entrerModeCreation() {
    this.estModeCreation = true;
  }

  onNomChange($event: any) {
    // this.nom = $event.target.value;
  }

  onTagsChange($event: any) {
    // const id = $event.target.value;
    // const isChecked = $event.target.checked;
    // this.tags.forEach((tag) => {
    //   if (tag.id == id) {
    //     tag.checked = isChecked;
    //   }
    // });
  }

  annulerAjout() {
    // this.estModeCreation = false;
  }

  ajouterPoule() {
    // const tagsPoule = this.tags.filter((tag) => tag.checked);
    // if (tagsPoule.length == 0 || this.nom.length == 0) {
    //   alert('Il manque des informations');
    //   return;
    // }
    // const nouvellePoule = {
    //   nom: this.nom,
    //   tags: tagsPoule,
    // } as Poule;
    // this.poulesService.creerPoule(nouvellePoule).subscribe(() => {
    //   this.chargerPoules();
    //   this.estModeCreation = false;
    // });
  }

  supprimerPoule(id: number) {
    this.poulesService
      .supprimerPoule(id)
      .subscribe(() => this.chargerPoules());
  }

  chargerPoules() {
    this.poulesService.getPoulesByEvent(this.id).subscribe((poules) => {
      this.poules = poules;
    });
  }


  drop(event: CdkDragDrop<Inscrit[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    this.updateInscrits();
  }

  updateInscrits(){
    this.poulesService.modifierInscrits(this.poules).subscribe(p => this.poules = p);
  }
}
