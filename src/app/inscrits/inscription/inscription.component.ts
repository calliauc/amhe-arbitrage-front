import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Inscrit } from '../../shared/models/inscrit';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IndividuService } from '../../shared/services/individus.service';
import { Individu } from '../../shared/models/individu';
import { NguiAutoCompleteDirective } from '@ngui/auto-complete';
import { Evenement } from '../../shared/models/evenement';
import { EvenementsService } from '../../shared/services/evenements.service';
import { Observable } from 'rxjs';
import { NouveauInscritModalComponent } from '../../shared/modales/nouveau-inscrit-modal/nouveau-inscrit-modal.component';

interface formRechercheIndividu{
  individu: FormControl<Individu|null>;
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
  });

  ngOnInit(): void {
    this.initFormInscription();
  }

  initFormInscription(){
    this.formInscription.controls.individu.valueChanges.subscribe(individu => {
      console.log(individu);
      this.individuAInscrire = individu||new Individu;
    });
  }

  afficheIndividu(item: Individu): string {
    return `${item.prenom} ${item.nom}`;
  }

  inscriptionValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => { 
      console.log(control.value);
      if(!control.value){
        return null;
      }
      const estDejaInscrit = this.estInscrit(control.value.id);
      const msgErreur =`${control.value.prenom} est déjà inscrit`;
      return estDejaInscrit?{dejaInscrit: {description: msgErreur}}:null;
    }
  }

  estInscrit(idIndividu:number):boolean{
    const estDejaInscrit = this.inscrits.find(inscrit => inscrit.idIndividu === idIndividu);
    return !!estDejaInscrit;
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
    if (this.individuAInscrire.id) {
      this.evenementService
      .inscrire(this.evenement.id, this.individuAInscrire.id)
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
