import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Inscrit } from '../../shared/models/inscrit';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Club } from '../../shared/models/club';
import { ConfirmationModalComponent } from '../../shared/modales/confirmation-modal/confirmation-modal.component';
import { IndividuService } from '../../shared/services/individus.service';
import { Individu } from '../../shared/models/individu';
import { NguiAutoCompleteDirective } from '@ngui/auto-complete';
import { Evenement } from '../../shared/models/evenement';
import { EvenementsService } from '../../shared/services/evenements.service';
import { Observable } from 'rxjs';
import { NouveauInscritModalComponent } from '../../shared/modales/nouveau-inscrit-modal/nouveau-inscrit-modal.component';

@Component({
    selector: 'app-inscription',
    imports: [
      ReactiveFormsModule,
      NguiAutoCompleteDirective,
      ConfirmationModalComponent,
      NouveauInscritModalComponent
    ],
    templateUrl: './inscription.component.html',
    styleUrl: './inscription.component.css'
})
export class InscriptionComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private individuService = inject(IndividuService);
  private evenementService = inject(EvenementsService);

  @Input() inscrit: Inscrit = new Inscrit();
  @Output() annulerEditionCreation = new EventEmitter<boolean>();
  @Output() supprimerInscrit = new EventEmitter<number>();
  @Output() validerCreation = new EventEmitter<null>();

  rechercheIndividu = (keyword: string): Observable<any> => {
    return this.individuService.searchIndividuByName(keyword);
  };

  individuAInscrire: Individu = new Individu;
  evenement!: Evenement;
  ereurSaisie: boolean;
  estModalIndividuVisible = false;
  estModalConfirmationVisible = false;
  titreModal = 'Confirmer la désinscription ?';
  texteModal = 'Cette action est définitive';
  formInscription!: FormGroup;

  constructor() {
    this.ereurSaisie = false;
  }

  ngOnInit(): void {
    this.evenementService.refreshEvent$.subscribe(event => this.evenement = event);
    this.initFormInscription();
  }

  initFormInscription(){
    this.formInscription = this.formBuilder.group({
      selectionIndividu: new FormControl(null, [
        Validators.required,
        this.inscriptionValidator()
      ]),
    });
    this.formInscription.controls['selectionIndividu'].valueChanges.subscribe((individu) => {
      console.log(this.formInscription.controls['selectionIndividu'].errors?.['dejaInscrit']);
      console.log(this.formInscription.controls['selectionIndividu'].errors);
      
      // if (this.estInscrit(individu.id)){
      //   this.ereurSaisie = true;
      // } else {
      //   this.ereurSaisie = false;
        this.individuAInscrire = individu;
      // }
    });
  }

  afficheIndividu(item: Individu): string {
    return `${item.prenom} ${item.nom}`;
  }

  inscriptionValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => { 
      if(!control.value){
        return null;
      }
      return this.estInscrit(control.value.id) ? {dejaInscrit: {msg: `${control.value.prenom} est déjà inscrit`}} : null
    }
  }

  estInscrit(idIndividu:number):boolean{
    const ins = this.evenement.inscrits?.find(inscrit => inscrit.idIndividu === idIndividu);
    console.log("ins : " + ins?.prenom);
    return !!ins;
  }

  annuler(): void {
    this.annulerEditionCreation.emit(true);
  }

  demanderSuppression(): void {
    this.estModalConfirmationVisible = true;
  }

  confirmerSuppression(id: number | string) {
    this.estModalConfirmationVisible = false;
    this.supprimerInscrit.emit(id as number);
  }

  annulerSuppression() {
    this.estModalConfirmationVisible = false;
  }

  confirmer(): void {
    this.ereurSaisie = false;
    this.inscrit = this.formInscription.value;
    if (this.individuAInscrire.id
      && this.evenement.inscrits
      && this.verifierInscription(this.individuAInscrire)
    ) {
      this.evenementService
      .inscrire(this.evenement.id, this.individuAInscrire.id)
      .subscribe((evenement) => {
        this.evenementService.refreshCacheEvent(evenement);
        this.validerCreation.emit()
      });
    } else {
      this.ereurSaisie = true;
      setTimeout(() => {
        this.ereurSaisie = false;
      }, 3000);
    }
  }


  verifierInscription(individu: Individu): boolean {
    this.ereurSaisie = this.evenement.inscrits!.filter(inscrit => inscrit.idIndividu === individu.id).length != 0;
    return !this.ereurSaisie;
  }

  creerIndividu(){
    this.estModalIndividuVisible=true;
  }

  confirmerInscriptionNouvelIndividu(individu: Individu){
    this.estModalIndividuVisible=false;
    console.log(individu);
    this.formInscription.controls["selectionIndividu"].patchValue(individu);
    this.confirmer();
  }

  annulerInscriptionNouvelIndividu(){
    this.estModalIndividuVisible=false;
    
  }
}
