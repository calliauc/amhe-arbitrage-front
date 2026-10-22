import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { Poule } from '../shared/models/poule';
import { Inscrit } from '../shared/models/inscrit';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { PoulesService } from '../shared/services/poules.service';
import { AuthV1Service } from '../shared/services/auth-v1.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NomsPipe } from '../shared/pipes/noms.pipe';
import { Evenement } from '../shared/models/evenement';
import { EvenementsService } from '../shared/services/evenements.service';
import { RolesNames } from '../shared/models/roles';

@Component({
    selector: 'app-gestion-poules',
    imports: [CdkDrag, NomsPipe, CdkDropListGroup, CdkDropList],
    templateUrl: './gestion-poules.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './gestion-poules.component.css'
})
export class GestionPoulesComponent implements OnInit {
  private logService = inject(AuthV1Service);
  private poulesService = inject(PoulesService);
  private evenementsService = inject(EvenementsService);
  private router = inject(Router);
  private Auth = AuthV1Service;

  evenement!: Evenement;
  poules: Poule[] = [];
  estModeCreation = false;
  role:RolesNames = 'guest';

constructor() {
    this.evenement = JSON.parse(localStorage.getItem('event') || "{\"id\":0}") as Evenement;
    console.log(this.evenement);    
    if(this.evenement.id == 0){
      localStorage.setItem('origin-page', 'poules');
      this.router.navigate(['evenements']);
    }
  }

  ngOnInit(): void {
    this.evenementsService.getEvenementById(this.evenement!.id).subscribe(e => this.evenement = e);
    this.recupererPoules();
    this.logService.notificationRole$.subscribe(e => this.role = e)
  }

  recupererPoules() {
    this.poulesService.getPoulesByEvent(this.evenement.id).subscribe((poules) => {
      this.poules = poules;
    });
  }
    entrerModeCreation() {
    this.estModeCreation = true;
  }

  onNomChange($event: any) {
    // this.nom = $event.target.value;
  }

  onItemsChange($event: any) {
    // const id = $event.target.value;
    // const isChecked = $event.target.checked;
    // this.items.forEach((item) => {
    //   if (item.id == id) {
    //     item.checked = isChecked;
    //   }
    // });
  }

  annulerAjout() {
    // this.estModeCreation = false;
  }

  ajouterPoule() {
    // const itemsPoule = this.items.filter((item) => item.checked);
    // if (itemsPoule.length == 0 || this.nom.length == 0) {
    //   alert('Il manque des informations');
    //   return;
    // }
    // const nouvellePoule = {
    //   nom: this.nom,
    //   items: itemsPoule,
    // } as Poule;
    // this.poulesService.creerPoule(nouvellePoule).subscribe(() => {
    //   this.chargerPoules();
    //   this.estModeCreation = false;
    // });
  }

  supprimerPoule(id: number) {
    this.poulesService
      .supprimerPoule(id)
      .subscribe(() => this.recupererPoules());
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
