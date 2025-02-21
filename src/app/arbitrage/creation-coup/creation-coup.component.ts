import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Coup } from '../../shared/models/coup';
import { CoupsService } from '../../shared/services/coups.service';
import { NouveauCoup } from '../../shared/models/nouveau-coup';
import { Match } from '../../shared/models/match';
import { NomsPipe } from '../../shared/pipes/noms.pipe';
import { TitleCasePipe } from '@angular/common';
import { RulesetRef } from '../../shared/models/ruleset-ref';

@Component({
  selector: 'app-creation-coup',
  standalone: true,
  imports: [ReactiveFormsModule, NomsPipe, TitleCasePipe],
  templateUrl: './creation-coup.component.html',
  styleUrl: './creation-coup.component.css',
})
export class CreationCoupComponent implements OnInit, OnChanges {
  @Input() match!: Match;
  borderA!: string;
  borderB!: string;

  nouveauCoup: NouveauCoup = new NouveauCoup();
  formSaisirCoup!: FormGroup;
  coupStr?: string;

  constructor(
    private coupsService: CoupsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.borderA = '2px solid ' + this.match.couleurA;
    this.borderB = '2px solid ' + this.match.couleurB;
    this.formSaisirCoup = this.formBuilder.group({
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

  ngOnChanges(changes: SimpleChanges): void {}

  onSubmit() {
    this.validerCoupLongsword();
    if (this.estCoupValide()) {
      this.enregistrerCoup(this.nouveauCoup);
      this.formSaisirCoup.reset();
      this.nouveauCoup = new NouveauCoup();
    } else {
      alert('Coup incomplet');
    }
  }

  validerCoupLongsword() {
    try {
      this.nouveauCoup.matchId = this.match.id;
      if (this.formSaisirCoup.value.attaquant == 'b') {
        this.nouveauCoup.attaquant = this.match.infosB;
        this.nouveauCoup.attaquantCouleur = this.match.couleurB;
        this.nouveauCoup.attaquantScore = this.match.scoreB;
        this.nouveauCoup.defenseur = this.match.infosA;
        this.nouveauCoup.defenseurCouleur = this.match.couleurA;
        this.nouveauCoup.defenseurScore = this.match.scoreA;
      } else if (this.formSaisirCoup.value.attaquant == 'a') {
        this.nouveauCoup.attaquant = this.match.infosA;
        this.nouveauCoup.attaquantCouleur = this.match.couleurA;
        this.nouveauCoup.attaquantScore = this.match.scoreA;
        this.nouveauCoup.defenseur = this.match.infosB;
        this.nouveauCoup.defenseurCouleur = this.match.couleurB;
        this.nouveauCoup.defenseurScore = this.match.scoreB;
      }
      this.nouveauCoup.vulnerant = {
        code: this.formSaisirCoup.value.vulnerant.code,
      } as RulesetRef;
      if (this.nouveauCoup.vulnerant.code === 'lutte') {
        this.nouveauCoup.cible = {
          code: 'lutte',
        } as RulesetRef;
      } else {
        this.nouveauCoup.cible = {
          code: this.formSaisirCoup.value.cible.code,
        } as RulesetRef;
      }
      this.nouveauCoup.doubleAtk = this.formSaisirCoup.value.doubleAtk;
      this.nouveauCoup.doubleDef = this.formSaisirCoup.value.doubleDef;
      this.nouveauCoup.afterblow = this.formSaisirCoup.value.afterblow;
      this.nouveauCoup.simultanee = this.formSaisirCoup.value.simultanee;
      this.nouveauCoup.faute = this.formSaisirCoup.value.faute;
      console.log(this.nouveauCoup);
    } catch {}
  }

  estCoupValide() {
    return (
      this.nouveauCoup.attaquant &&
      this.nouveauCoup.defenseur &&
      this.nouveauCoup.vulnerant &&
      this.nouveauCoup.cible
    );
  }

  enregistrerCoup(nouveauCoup: NouveauCoup) {
    let date = new Date();
    console.log(date);

    let coup = {
      matchId: nouveauCoup.matchId,
      attaquant: nouveauCoup.attaquant,
      attaquantCouleur: nouveauCoup.attaquantCouleur,
      attaquantScore: nouveauCoup.attaquantScore,
      defenseur: nouveauCoup.defenseur,
      defenseurCouleur: nouveauCoup.defenseurCouleur,
      defenseurScore: nouveauCoup.defenseurScore,
      doubleAtk: nouveauCoup.doubleAtk,
      doubleDef: nouveauCoup.doubleDef,
      afterblow: nouveauCoup.afterblow,
      simultanee: nouveauCoup.simultanee,
      faute: nouveauCoup.faute,
      timecode: date,
      vulnerant: nouveauCoup.vulnerant,
      cible: nouveauCoup.cible,
    } as Coup;
    console.log(coup);

    this.coupsService.creerCoup(coup).subscribe((coup) => {
      this.coupsService.notificationCoup.next(true);
    });
  }
}
