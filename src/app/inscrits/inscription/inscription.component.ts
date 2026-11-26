import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Inscrit } from '../../shared/models/inscrit';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IndividuService } from '../../shared/services/individus.service';
import { Individu } from '../../shared/models/individu';
import { NguiAutoCompleteDirective } from '@ngui/auto-complete';
import { Evenement } from '../../shared/models/evenement';
import { EvenementsService } from '../../shared/services/evenements.service';
import { Observable } from 'rxjs';
import { NouveauInscritModalComponent } from '../../shared/modales/nouveau-inscrit-modal/nouveau-inscrit-modal.component';
import { InscritsService } from '../../shared/services/inscrits.service';

interface formRechercheIndividu{
  individu: FormControl<Individu|null>;
  listeAttente: FormControl<boolean|null>;
}

@Component({
    selector: 'app-inscription',
    imports: [
      ReactiveFormsModule,
      NguiAutoCompleteDirective,
      NouveauInscritModalComponent
    ],
    templateUrl: './inscription.component.html',
    styleUrl: './inscription.component.css'
})
export class InscriptionComponent implements OnInit {
  private individuService = inject(IndividuService);
  private evenementService = inject(EvenementsService);
  private inscritService = inject(InscritsService);

  @Input() evenement!: Evenement;
  @Input() inscrits!: Inscrit[];
  @Output() annulerEditionCreation = new EventEmitter<boolean>();
  @Output() validerCreation = new EventEmitter<null>();

  rechercheIndividu = (keyword: string): Observable<any> => {
    return this.individuService.searchIndividuByName(keyword);
  };

  individuAInscrire: Individu = new Individu;
  inscritTemp?: Inscrit;
  estModalIndividuVisible = false;
  estModalConfirmationVisible = false;
  titreModal = 'Confirmer la désinscription ?';
  texteModal = 'Cette action est définitive';

  formInscription: FormGroup<formRechercheIndividu> = new FormGroup({
    individu: new FormControl<Individu|null>(null, this.inscriptionValidator()),
    listeAttente: new FormControl<boolean>(false)
  });

  ngOnInit(): void {
    this.initFormInscription();
  }

  initFormInscription(){
    this.formInscription.controls.individu.valueChanges.subscribe(individu => {
      this.individuAInscrire = individu||new Individu;
    });
    this.formInscription.controls.listeAttente.patchValue(!!this.evenement.nbPlacesMax && this.evenement.nbPlacesMax <= this.inscrits.length)
  }

  afficheIndividu(item: Individu): string {
    return `${item.prenom} ${item.nom}`;
  }

  inscriptionValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => { 
      if(!control.value){
        return null;
      }
      const inscritExistant = this.estInscrit(control.value.id);

      let detailInscriptionExistante = '';
      if (!inscritExistant?.estDesinscrit && !inscritExistant?.estListeAttente){
        detailInscriptionExistante += ("est déjà inscrit(e)")
      }else if (inscritExistant?.estDesinscrit){
        detailInscriptionExistante +=('a déjà été désinscrit(e)')
      } else if (inscritExistant?.estListeAttente){
        detailInscriptionExistante += ("est déjà en liste d'attente")
      }

      return inscritExistant?{dejaInscrit: {description: `${control.value.prenom} ${detailInscriptionExistante}`}}:null;
    }
  }

  estInscrit(idIndividu:number):Inscrit|undefined{
    return this.inscrits.find(inscrit => inscrit.idIndividu === idIndividu);
  }

  getErreur(code: string){
    return this.formInscription.controls.individu.getError(code).description;
  }

  annuler(): void {
    this.annulerEditionCreation.emit(true);
  }

  reset(): void {
    this.formInscription.controls.individu.reset();
    this.inscritTemp = undefined;
  }

  confirmerInscription(): void {
    const listeAttente = this.formInscription.controls.listeAttente.value||false;
    const idIndividu = this.formInscription.controls.individu.value!.id;
    const inscription:Inscrit = {
      idEvenement: this.evenement.id,
      idIndividu: idIndividu,
      estListeAttente: listeAttente
    } as Inscrit;
    if (this.individuAInscrire.id) {
      this.evenementService
      .inscrire(this.evenement.id, inscription)
      .subscribe((evenement) => {
        this.evenement = evenement;
        this.evenementService.refreshCacheEvent(evenement);
        this.validerCreation.emit()
      });
    }
  }

  creerIndividu(){
    this.estModalIndividuVisible=true;
  }

  confirmerInscriptionNouvelIndividu(individu: Individu){
    this.estModalIndividuVisible=false;
    this.formInscription.controls.individu.patchValue(individu);
  }

  annulerInscriptionNouvelIndividu(){
    this.estModalIndividuVisible=false;
    
  }
}
