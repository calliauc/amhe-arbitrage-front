import { Component, Input, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Echange } from '../../shared/models/echange';
import { EchangesService } from '../../shared/services/echanges.service';
import { Match } from '../../shared/models/match';
import { NomsPipe } from '../../shared/pipes/noms.pipe';
import { TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-creation-coup',
    imports: [ReactiveFormsModule, NomsPipe, TitleCasePipe],
    templateUrl: './creation-coup.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './creation-coup.component.css'
})
export class CreationCoupComponent implements OnInit {
  private echangesService = inject(EchangesService);
  private formBuilder = inject(FormBuilder);

  @Input() match!: Match;
  borderA!: string;
  borderB!: string;

  // nouveauEchange: IEchangeForm = new EchangeForm();
  formSaisirEchange!: FormGroup;
  echangeStr?: string;

  ngOnInit(): void {
    this.borderA = '2px solid ' + "rgb(68, 143, 255)";
    this.borderB = '2px solid ' + "rgb(189, 152, 32)";
    this.formSaisirEchange = this.formBuilder.group({
      attaquant: null,
      vulnerant: null,
      cible: null,
      doubleAtk: false,
      doubleDef: false,
      afterblow: false,
      simultanee: false,
      faute: false,
    });
  }

  onSubmit() {
    this.validerEchangeLongsword();
    if (this.estEchangeValide()) {
      // this.enregistrerEchange(this.nouveauEchange);
      this.formSaisirEchange.reset();
      // this.nouveauEchange = new EchangeForm();
    } else {
      alert('Echange incomplet');
    }
  }

  validerEchangeLongsword() {
    // try {
    //   this.nouveauEchange.matchId = this.match.id;
    //   if (this.formSaisirEchange.value.attaquant == 'b') {
    //     this.nouveauEchange.attaquant = this.match.inscritB;
    //     this.nouveauEchange.attaquantCouleur = "rgb(189, 152, 32)";
    //     this.nouveauEchange.attaquantScore = this.match.scoreB;
    //     this.nouveauEchange.defenseur = this.match.inscritA;
    //     this.nouveauEchange.defenseurCouleur = "rgb(68, 143, 255)";
    //     this.nouveauEchange.defenseurScore = this.match.scoreA;
    //   } else if (this.formSaisirEchange.value.attaquant == 'a') {
    //     this.nouveauEchange.attaquant = this.match.inscritA;
    //     this.nouveauEchange.attaquantCouleur = "rgb(68, 143, 255)";
    //     this.nouveauEchange.attaquantScore = this.match.scoreA;
    //     this.nouveauEchange.defenseur = this.match.inscritB;
    //     this.nouveauEchange.defenseurCouleur = "rgb(189, 152, 32)";
    //     this.nouveauEchange.defenseurScore = this.match.scoreB;
    //   }
    //   this.nouveauEchange.vulnerant = {
    //     code: this.formSaisirEchange.value.vulnerant.code,
    //   } as Item;
    //   if (this.nouveauEchange.vulnerant.code === 'lutte') {
    //     this.nouveauEchange.cible = {
    //       code: 'lutte',
    //     } as Item;
    //   } else {
    //     this.nouveauEchange.cible = {
    //       code: this.formSaisirEchange.value.cible.code,
    //     } as Item;
    //   }
    //   this.nouveauEchange.doubleAtk = this.formSaisirEchange.value.doubleAtk;
    //   this.nouveauEchange.doubleDef = this.formSaisirEchange.value.doubleDef;
    //   this.nouveauEchange.afterblow = this.formSaisirEchange.value.afterblow;
    //   this.nouveauEchange.simultanee = this.formSaisirEchange.value.simultanee;
    //   this.nouveauEchange.faute = this.formSaisirEchange.value.faute;
    //   console.log(this.nouveauEchange);
    // } catch (e){
    //   console.log(e);
    // }
  }

  estEchangeValide() {
    // return (
    //   this.nouveauEchange.attaquant &&
    //   this.nouveauEchange.defenseur &&
    //   this.nouveauEchange.vulnerant &&
    //   this.nouveauEchange.cible
    // );
    return true;
  }
}
