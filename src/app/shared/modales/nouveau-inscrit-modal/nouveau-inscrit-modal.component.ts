import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, inject } from '@angular/core';
import { Individu } from '../../models/individu';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, RequiredValidator } from '@angular/forms';
import { Club } from '../../models/club';
import { ClubsService } from '../../services/clubs.service';
import { IndividuService } from '../../services/individus.service';
import { Observable } from 'rxjs';
import { NguiAutoCompleteDirective } from '@ngui/auto-complete';
import { AsyncPipe } from '@angular/common';

interface formIndividu{
  nom: FormControl<string|null>;
  prenom: FormControl<string|null>;
  club: FormControl<Club|null>;
}

@Component({
    selector: 'app-nouveau-inscrit-modal',
    imports: [ReactiveFormsModule, NguiAutoCompleteDirective, AsyncPipe],
    templateUrl: './nouveau-inscrit-modal.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './nouveau-inscrit-modal.component.css'
})
export class NouveauInscritModalComponent {
  @Input() titre = "Confirmer l'action ?";
  @Input() texte = 'Pour de vrai de vrai ? Pinkie promesse ?';
  @Output() confirmer = new EventEmitter<Individu>();
  @Output() annuler = new EventEmitter<boolean>();

  private clubService = inject(ClubsService);
  private individuService = inject(IndividuService);

  clubs$!: Observable<Club[]>;

  formCreationIndividu: FormGroup<formIndividu> = new FormGroup({
    nom: new FormControl<string>(""),
    prenom: new FormControl<string>(""),
    club: new FormControl<Club>(new Club())
  });

  constructor(){
    this.clubs$ = this.clubService.getClubs();
    this.formCreationIndividu.controls.club.patchValue(null);
  }

  formatName(item: Club): string {
    return `${item.nomCourt}`;
  }
  
  confirmerAction() {
    const individu:Individu = {
      nom: this.formCreationIndividu.value.nom!, 
      prenom: this.formCreationIndividu.value.prenom!,
      club: this.formCreationIndividu.value.club!
    };
    this.individuService.creerIndividu(individu).subscribe(ind => {
      console.log(ind);      
      this.confirmer.emit(ind);
    })
  }
  annulerAction(): void {
    this.annuler.emit(true);
  }
}
