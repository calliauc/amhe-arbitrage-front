import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatchsService } from '../shared/services/matchs.service';
import { Match } from '../shared/models/match';
import { Router } from '@angular/router';
import { MatchAfficherComponent } from './match-afficher/match-afficher.component';
import { HemaRatingService } from '../shared/services/hema-rating.sevice';
import { environment } from '../../environments/environment';
import { LogService } from '../shared/services/log.service';
import { NguiAutoCompleteDirective } from '@ngui/auto-complete';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Combattant } from '../shared/models/combattant';
import { CombattantsService } from '../shared/services/combattants.service';
import { TagsService } from '../shared/services/tags.service';
import { Tag, TagCb } from '../shared/models/tag';
import { CriteresRechercheMatch } from '../shared/models/criteresRechercheMatch';

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
  private logService = inject(LogService);
  private matchsService = inject(MatchsService);
  private hemaRatingService = inject(HemaRatingService);
  private combattantsService = inject(CombattantsService);
  private tagsService = inject(TagsService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  matchsNouveau: Match[] = [];
  matchsEnCours: Match[] = [];
  matchsFinis: Match[] = [];

  formFiltrage!: FormGroup;
  combattantFiltre: Combattant = new Combattant;
  combattantsListe: Combattant[] = [];
  tagsFiltreListe: TagCb[] = [];
  criteres: CriteresRechercheMatch = new CriteresRechercheMatch;

  estModalVisible = false;  
  titreModal = 'Confirmer la suppression ?';
  texteModal = 'Cette action est définitive';

  idASupprimer?: number;
  estLog = false;
  estScoresOk = false;
  env = environment;
  URL_HEMA_RATING = `${this.env.baseUrl}/hema-rating/get-csv`;


  ngOnInit(): void {
    this.logService.notification$.subscribe(e => this.estLog = e)
    this.initData();
    this.chercherMatchs(this.criteres);
    this.initForm();
  }

  initData(){
    this.combattantsService.getCombattants().subscribe((liste) => {
      this.combattantsListe = liste;
    });
    this.tagsService.getTags().subscribe((tags) => {
      tags.forEach((tag) =>
        this.tagsFiltreListe.push({
          id: tag.id,
          code: tag.code,
          checked: false,
        })
      );
    });
  }

  getMatchs() {
    this.matchsService.getMatchs().subscribe((matchs) => {
      this.repartirMatchs(matchs);
    });
  }

  chercherMatchs(criteres: CriteresRechercheMatch) {
    this.matchsService.rechercherMatch(criteres).subscribe((matchs) => {
      this.repartirMatchs(matchs);
    });
  }

  repartirMatchs(matchs: Match[]):Match[]{
    if (matchs) {
        this.matchsNouveau = matchs.filter((match) => match.statut === 'nouveau');
        this.matchsEnCours = matchs.filter((match) => match.statut === 'en cours');
        this.matchsFinis = matchs.filter((match) => match.statut === 'fini');
      } else {
        this.matchsNouveau = [];
        this.matchsEnCours = [];
        this.matchsFinis = [];
      }
    return matchs;
  }

  initForm() {
    this.formFiltrage = this.formBuilder.group({
      combattantFiltre: null,
      tagsFiltre:null,
    });
    this.formFiltrage.valueChanges.subscribe((values) => {
      console.log("id recherché : " + values.combattantFiltre.id);
      if (values.combattantFiltre.id){
        this.criteres.idCombattant = values.combattantFiltre.id;
      } else {
        this.criteres.idCombattant = undefined;
      }
      this.chercherMatchs(this.criteres)
    });
  }
  
  onCheckTag($event: any) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;
    this.tagsFiltreListe.forEach((tag) => {
      if (tag.id == id) {
        tag.checked = isChecked;
      }
    });
    this.criteres.idTags = this.tagsFiltreListe.filter(tag => tag.checked).map(tag => tag.id);
    this.chercherMatchs(this.criteres);
  }

  formatName(item: Combattant): string {
    // return `${item.prenom} ${item.nom} (${item.club?.nomCourt})`;
    return `${item.prenom}`;
  }

  creerMatch() {
    this.router.navigate(['creer-match']);
  }

  demanderSuppression(id: number): void {
    this.idASupprimer = id;
    this.estModalVisible = true;
  }

  confirmerSuppression(id: number | string) {
    this.estModalVisible = false;
    this.matchsService
      .supprimerMatch(id as number)
      .subscribe(() => this.getMatchs());
  }

  annulerSuppression() {
    this.estModalVisible = false;
  }

  editerScores() {
    this.hemaRatingService
      .calculerResultats()
      .subscribe(() => (this.estScoresOk = true));
  }
}
