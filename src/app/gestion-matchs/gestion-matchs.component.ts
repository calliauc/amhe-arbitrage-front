import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatchsService } from '../shared/services/matchs.service';
import { Match } from '../shared/models/match';
import { Router } from '@angular/router';
import { MatchAfficherComponent } from './match-afficher/match-afficher.component';
import { HemaRatingService } from '../shared/services/hema-rating.sevice';
import { environment } from '../../environments/environment';
import { AuthV1Service } from '../shared/services/auth-v1.service';
import { NguiAutoCompleteDirective } from '@ngui/auto-complete';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InscritsService } from '../shared/services/inscrits.service';
import { CriteresRechercheMatch } from '../shared/models/criteresRechercheMatch';
import { Inscrit } from '../shared/models/inscrit';
import { Evenement } from '../shared/models/evenement';
import { EvenementsService } from '../shared/services/evenements.service';
import { RolesNames } from '../shared/models/roles';
import { ItemsService } from '../shared/services/items.service';
import { Item } from '../shared/models/item';
import { MenuMobileService } from '../shared/services/menu-mobile.service';
import { Poule } from '../shared/models/poule';
import { PoulesService } from '../shared/services/poules.service';

interface formFiltrage{
  inscrit: FormControl<Inscrit|null>;
  poule: FormControl<Poule|null>;
  code: FormControl<string|null>;
}

@Component({
    selector: 'app-gestion-matchs',
    imports: [
      MatchAfficherComponent,
      ReactiveFormsModule,
      NguiAutoCompleteDirective,
    ],
    templateUrl: './gestion-matchs.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './gestion-matchs.component.css'
})
export class GestionMatchsComponent implements OnInit {
  private Auth = AuthV1Service;
  private logService = inject(AuthV1Service);
  private matchsService = inject(MatchsService);
  private pouleService = inject(PoulesService);
  private router = inject(Router);
  private evenementsService = inject(EvenementsService);
  private menuMobileService = inject(MenuMobileService);

  matchsNouveau: Match[] = [];
  matchsEnCours: Match[] = [];
  matchsFinis: Match[] = [];

  matchsNouveauFiltre: Match[] = [];
  matchsEnCoursFiltre: Match[] = [];
  matchsFinisFiltre: Match[] = [];
  
  pouleListe: Poule[] = [];
  criteres: CriteresRechercheMatch = new CriteresRechercheMatch;
  codeMatch: string="";

  masqueNouveaux = false;
  masqueEnCours = true;
  masqueFinis = true;

  estModalVisible = false;
  titreModal = 'Confirmer la suppression ?';
  texteModal = 'Cette action est définitive';

  codeListe:string[] = [];
  idASupprimer?: number;
  evenement!:Evenement;
  role:RolesNames = 'guest';

  formFiltrageMatchs: FormGroup<formFiltrage> = new FormGroup({
    inscrit: new FormControl<Inscrit|null>(null),
    poule: new FormControl<Poule|null>(null),
    code: new FormControl<string|null>(null),
  });

  constructor(private _auth: AuthV1Service) {
    this.evenement = JSON.parse(localStorage.getItem('event') || "{\"id\":0}") as Evenement;
    console.log(this.evenement);    
    if(this.evenement.id == 0){
      localStorage.setItem('origin-page', 'matchs');
      this.router.navigate(['evenements']);
    }
  }

  ngOnInit(): void {
    this.menuMobileService.pageActuelle.next('MATCHS');
    this.evenementsService.getEvenementById(this.evenement!.id).subscribe(e => {this.evenement = e});
    this.pouleService.getPoulesByEvent(this.evenement.id).subscribe(p => this.pouleListe = p?.length>1?[...p]:[]);
    this.logService.notificationRole$.subscribe(e => this.role = e);
    this.criteres.idEvenement = this.evenement.id;
    this.chercherMatchs(this.criteres);
    this.formFiltrageMatchs.controls.inscrit.valueChanges.subscribe(inscrit => {
      this.resetCode();
      this.criteres.idInscrit = inscrit?.id;
      this.chercherMatchs(this.criteres);
    })
    this.formFiltrageMatchs.controls.poule.valueChanges.subscribe(poule => {
      this.resetCode();
      this.criteres.idPoule = poule?.id;
      this.chercherMatchs(this.criteres);
    })
    this.formFiltrageMatchs.controls.code.valueChanges.subscribe(code => {
      if (code && code !==""){
        this.matchsNouveauFiltre = [...this.matchsNouveau].filter(match => match.code == code);
        this.matchsEnCoursFiltre = [...this.matchsEnCours].filter(match => match.code == code);
        this.matchsFinisFiltre = [...this.matchsFinis].filter(match => match.code == code);
        this.masqueNouveaux = false;
        this.masqueEnCours = false;
        this.masqueFinis = false;
      } else {
        this.matchsNouveauFiltre = [...this.matchsNouveau];
        this.matchsEnCoursFiltre = [...this.matchsEnCours];
        this.matchsFinisFiltre = [...this.matchsFinis];
      }
    })
    this.resetCode();
  }

  chercherMatchs(criteres: CriteresRechercheMatch) {
    this.matchsService.rechercherMatch(criteres).subscribe((matchs) => {
      this.repartirMatchs(matchs);
    });
  }

  repartirMatchs(matchs: Match[]):Match[]{
    if (matchs) {
        this.codeListe = [...matchs].map(match => match.code as string);
        this.matchsNouveau = matchs.filter((match) => match.statut === 'nouveau');
        this.matchsEnCours = matchs.filter((match) => match.statut === 'en cours');
        this.matchsFinis = matchs.filter((match) => match.statut === 'fini');
      } else {
        this.matchsNouveau = [];
        this.matchsEnCours = [];
        this.matchsFinis = [];
      }
      this.matchsNouveauFiltre = [...this.matchsNouveau];
      this.matchsEnCoursFiltre = [...this.matchsEnCours];
      this.matchsFinisFiltre = [...this.matchsFinis];
    return matchs;
  }


  formatInscrit(item: Inscrit): string {
    return `${item.prenom} ${item.nom} (${item.club})`;
  }

  formatPoule(item: Poule): string {
    return `${item.nom}`;
  }

  resetInscrit(){
    this.formFiltrageMatchs.controls.inscrit.reset();
  }

  resetPoule(){
    this.formFiltrageMatchs.controls.poule.reset();
  }

  resetCode(){
    this.formFiltrageMatchs.controls.code.reset();
  }

  affichageNouveaux(){
    this.masqueNouveaux = !this.masqueNouveaux;
  }

  affichageEnCours(){
    this.masqueEnCours = !this.masqueEnCours;
  }

  affichageFinis(){
    this.masqueFinis = !this.masqueFinis;
  }

  creerMatch() {
    this.router.navigate(['creer-match']);
  }

  getMatchs(){
    this.chercherMatchs(this.criteres);
  }

  demanderSuppression(id: number): void {
    this.idASupprimer = id;
    this.estModalVisible = true;
  }

  confirmerSuppression(id: number | string) {
    this.estModalVisible = false;
    this.matchsService
      .supprimerMatch(id as number)
      .subscribe(() => this.chercherMatchs(this.criteres));
  }

  annulerSuppression() {
    this.estModalVisible = false;
  }
}
