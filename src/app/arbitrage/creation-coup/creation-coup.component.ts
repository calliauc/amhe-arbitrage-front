import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Coup } from '../../shared/models/coup';
import { CoupsService } from '../../shared/services/coups.service';
import { NouveauCoup } from '../../shared/models/nouveau-coup';
import { Match } from '../../shared/models/match';
import { NomsPipe } from '../../shared/pipes/noms.pipe';
import { TitleCasePipe } from '@angular/common';
import { CiblesService } from '../../shared/services/cibles.service';
import { VulnerantsService } from '../../shared/services/vulnerants.service';
import { RulesetRef } from '../../shared/models/ruleset-ref';

@Component({
  selector: 'app-creation-coup',
  standalone: true,
  imports: [ReactiveFormsModule, NomsPipe, TitleCasePipe],
  templateUrl: './creation-coup.component.html',
  styleUrl: './creation-coup.component.css',
})
export class CreationCoupComponent implements OnInit {
  @Input() match!: Match;
  vulnerants!: RulesetRef[];
  cibles!: RulesetRef[];

  nouveauCoup: NouveauCoup = new NouveauCoup();
  formSaisirCoup!: FormGroup;
  coupStr?: string;

  constructor(
    private coupsService: CoupsService,
    private vulnerantsService: VulnerantsService,
    private ciblesService: CiblesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.ciblesService
      .getCibles()
      .subscribe((cibles) => (this.cibles = cibles));
    this.vulnerantsService
      .getVulnerants()
      .subscribe((vulnerants) => (this.vulnerants = vulnerants));
    this.formSaisirCoup = this.formBuilder.group({
      attaquant: null,
      vulnerant: null,
      cible: null,
    });
  }

  onSubmit() {
    this.validererCoupLongsword();
    this.enregistrerCoup(this.nouveauCoup);
    this.formSaisirCoup.reset();
    this.nouveauCoup = new NouveauCoup();
  }

  validererCoupLongsword() {
    this.nouveauCoup.matchId = this.match.id;
    if (this.formSaisirCoup.value.attaquant == 'b') {
      this.nouveauCoup.attaquant = this.match.infosB;
      this.nouveauCoup.attaquantCouleur = this.match.couleurB;
      this.nouveauCoup.defenseur = this.match.infosA;
      this.nouveauCoup.defenseurCouleur = this.match.couleurA;
    } else if (this.formSaisirCoup.value.attaquant == 'a') {
      this.nouveauCoup.attaquant = this.match.infosA;
      this.nouveauCoup.attaquantCouleur = this.match.couleurA;
      this.nouveauCoup.defenseur = this.match.infosB;
      this.nouveauCoup.defenseurCouleur = this.match.couleurB;
    }
    this.nouveauCoup.vulnerant = {
      id: this.formSaisirCoup.value.vulnerant.id,
    } as RulesetRef;
    this.nouveauCoup.cible = {
      id: this.formSaisirCoup.value.cible.id,
    } as RulesetRef;
  }

  enregistrerCoup(nouveauCoup: NouveauCoup) {
    let coup: Coup = {
      matchId: nouveauCoup.matchId,
      attaquant: nouveauCoup.attaquant,
      attaquantCouleur: nouveauCoup.attaquantCouleur,
      defenseur: nouveauCoup.defenseur,
      defenseurCouleur: nouveauCoup.defenseurCouleur,
      vulnerant: nouveauCoup.vulnerant,
      cible: nouveauCoup.cible,
    } as Coup;
    this.coupsService.creerCoup(coup).subscribe((coup) => {
      this.coupsService.notificationCoup.next(true);
    });
  }
}
