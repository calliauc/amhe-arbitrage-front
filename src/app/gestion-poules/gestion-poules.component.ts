import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { Poule } from '../shared/models/poule';
import { Inscrit } from '../shared/models/inscrit';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, copyArrayItem, moveItemInArray, transferArrayItem, CdkDragHandle } from '@angular/cdk/drag-drop';
import { PoulesService } from '../shared/services/poules.service';
import { AuthV1Service } from '../shared/services/auth-v1.service';
import { Router } from '@angular/router';
import { NomsPipe } from '../shared/pipes/noms.pipe';
import { Evenement } from '../shared/models/evenement';
import { EvenementsService } from '../shared/services/evenements.service';
import { RolesNames } from '../shared/models/roles';
import { MenuMobileService } from '../shared/services/menu-mobile.service';
import { MatchsService } from '../shared/services/matchs.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationModalComponent } from '../shared/modales/confirmation-modal/confirmation-modal.component';

interface formPoule{
  nom: FormControl<string|null>;
  prefixe: FormControl<string|null>;
}


@Component({
    selector: 'app-gestion-poules',
    imports: [CdkDrag, NomsPipe, CdkDropListGroup, CdkDropList, ReactiveFormsModule, ConfirmationModalComponent],
    templateUrl: './gestion-poules.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './gestion-poules.component.css'
})
export class GestionPoulesComponent implements OnInit {
  private logService = inject(AuthV1Service);
  private poulesService = inject(PoulesService);
  private matchsService = inject(MatchsService);
  private evenementsService = inject(EvenementsService);
  private menuMobileService = inject(MenuMobileService);
  private router = inject(Router);
  private Auth = AuthV1Service;

  evenement!: Evenement;
  poules: Poule[] = [];
  doublon?:Inscrit;
  listeInscritsActifs!: Inscrit[];
  idPouleActive?: number;
  estModeCreation = false;
  estModeEdition = false;
  estModeAjout = false;
  estModalVisible = false;
  role:RolesNames = 'guest';

  formCreationPoule: FormGroup<formPoule> = new FormGroup({
    nom: new FormControl<string>(""),
    prefixe: new FormControl<string>(""),
  });

constructor() {
    this.evenement = JSON.parse(localStorage.getItem('event') || "{\"id\":0}") as Evenement;
    console.log(this.evenement);    
    if(this.evenement.id == 0){
      localStorage.setItem('origin-page', 'poules');
      this.router.navigate(['evenements']);
    }
  }

  
  ngOnInit(): void {
    this.menuMobileService.pageActuelle.next('POULES');
    this.evenementsService.getEvenementById(this.evenement!.id).subscribe(e => {
      this.evenement = e;
      if (e.inscrits){
        const list = e.inscrits
        .filter((i:Inscrit) => !i.estDesinscrit && !i.estListeAttente)
        .sort((a, b) => a.prenom>b.prenom?1:-1);
        
        this.listeInscritsActifs = [... list];
      }
    });
    this.logService.notificationRole$.subscribe(e => this.role = e)
    this.recupererPoules();
  }

  recupererPoules() {
    this.poulesService.getPoulesByEvent(this.evenement.id).subscribe((poules) => {
      this.poules = poules;
    });
  }

  basculerModeEdition(modeEdition:boolean) {
    this.estModeEdition = modeEdition;
  }

  basculerModeCreation(modecreation:boolean) {
    this.estModeCreation = modecreation;
  }

  resetNom(){
    this.formCreationPoule.controls.nom.reset();
  }
  resetPrefixe(){
    this.formCreationPoule.controls.prefixe.reset();
  }

  ajouterPoule() {  
    const nouvellePoule = {
      evenement: this.evenement, ...this.formCreationPoule.value
    } as Poule;
    if(!nouvellePoule.nom || !nouvellePoule.prefixe){
      return;
    }
    
    this.poulesService.creerPoule(nouvellePoule).subscribe((pouleCree) => {
      this.estModeCreation = false;
      this.recupererPoules();
    });
  }

  confirmerSuppression(id: number) {
    this.estModalVisible = false;
    this.creerMatchs(id);
  }

  annulerSuppression() {
    this.idPouleActive = undefined;
    this.estModalVisible = false;
  }

  genererMatchsAvecVerif(poule: Poule){
    if(this.matchsExistant(poule)){
      this.idPouleActive = poule.id;
      this.estModalVisible = true;
    } else {
      this.creerMatchs(poule.id!);
    }
  }

  creerMatchs(id: number){
    this.idPouleActive = undefined;
    this.matchsService.creerMatchs(id).subscribe(matchs => {
      this.recupererPoules();
      alert(`${matchs.length} matchs créés`)
    });
  }

  supprimerPoule(id: number) {
    this.poulesService
      .supprimerPoule(id)
      .subscribe(() => this.recupererPoules());
  }

  retirerInscritPoule(poule: Poule, inscrit: Inscrit){
    this.poules.find(p => p.id === poule.id)!.inscrits = poule.inscrits.filter(i => i.id !== inscrit.id);
    this.updateInscrits();
  }

  doublonPredicate(inscrit:CdkDrag<Inscrit>, destination:CdkDropList<Inscrit[]>):boolean {
    // console.log("=========");
    // console.log("inscrit", inscrit);
    // console.log("destination", destination);
    
    // const p:Set<Poule> = destination["_group"]["_items"];
    // const pp: any[] = [...p].slice(1);
    // const inscritsPoules:number[] = pp.flatMap(poule => poule.data).map(inscrit => inscrit?.id);
    // console.log(inscritsPoules, inscrit.data.id);
    // const doublon = inscritsPoules.includes(inscrit.data.id);
    // console.log("Présence d'un doublon : ", doublon);
    
    // return !doublon;
    
    
    const value = destination.data.filter(existant => existant.id == inscrit.data.id);
    return value.length==0;
  }

  noPredicate(item:CdkDrag<Inscrit>, drop:CdkDropList<Inscrit[]>):boolean {
    return false;
  }

  drop(event: CdkDragDrop<Inscrit[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if(event.previousContainer.hasAnchor){
        copyArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
     else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );  
      }
    }

    this.updateInscrits();
  }

  matchsExistant(poule: Poule){
    return poule.matchs.length>=1;
  }

  updateInscrits(){
    this.poulesService.modifierInscrits(this.poules).subscribe(p => this.poules = p);
  }


}
