import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Coup } from '../../shared/models/coup';
import { Vulnerant } from '../../shared/models/vulnerant';
import { Cible } from '../../shared/models/cible';
import { CoupsService } from '../../shared/services/coups.service';
import { NouveauCoup } from '../../shared/models/nouveau-coup';
import { Match } from '../../shared/models/match';
import { NomsPipe } from '../../shared/pipes/noms.pipe';
import { TitleCasePipe } from '@angular/common';
import { CiblesService } from '../../shared/services/cibles.service';
import { VulnerantsService } from '../../shared/services/vulnerants.service';

@Component({
  selector: 'app-creation-coup',
  standalone: true,
  imports: [ReactiveFormsModule, NomsPipe, TitleCasePipe],
  templateUrl: './creation-coup.component.html',
  styleUrl: './creation-coup.component.css',
})
export class CreationCoupComponent implements OnInit {
  @Input() match!: Match;
  vulnerants!: Vulnerant[];
  cibles!: Cible[];

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
    if (this.formSaisirCoup.value.attaquant == 'rouge') {
      this.nouveauCoup.attaquant = this.match.rouge;
      this.nouveauCoup.attaquantCouleur = 'rouge';
      this.nouveauCoup.defenseur = this.match.bleu;
      this.nouveauCoup.defenseurCouleur = 'bleu';
    } else if (this.formSaisirCoup.value.attaquant == 'bleu') {
      this.nouveauCoup.attaquant = this.match.bleu;
      this.nouveauCoup.attaquantCouleur = 'bleu';
      this.nouveauCoup.defenseur = this.match.rouge;
      this.nouveauCoup.defenseurCouleur = 'rouge';
    }
    this.nouveauCoup.vulnerant = {
      id: this.formSaisirCoup.value.vulnerant.id,
    } as Vulnerant;
    this.nouveauCoup.cible = {
      id: this.formSaisirCoup.value.cible.id,
    } as Cible;
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
