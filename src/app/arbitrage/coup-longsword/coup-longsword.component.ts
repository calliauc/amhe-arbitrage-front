import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Coup } from '../../shared/models/coup';
import { VulnerantLongsword } from '../../shared/models/vulnerants';
import { PartieCorpsLongsword } from '../../shared/models/partie-corps';
import { CoupsService } from '../../shared/services/coups.service';
import { Couleurs } from '../../shared/models/combattant';
import { NouveauCoup } from '../../shared/models/nouveau-coup';

@Component({
  selector: 'app-coup-longsword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './coup-longsword.component.html',
  styleUrl: './coup-longsword.component.css',
})
export class CoupLongswordComponent {
  // nouveauCoup: NouveauCoup = {};
  coupStr?: string;
  formSaisirCoup!: FormGroup;
  combattants = [
    { id: 1, couleur: Couleurs.Bleu },
    { id: 2, couleur: Couleurs.Rouge },
  ];

  constructor(private coupsService: CoupsService) {
    this.formSaisirCoup = new FormGroup({
      attaquant: new FormControl(''),
      vulnerant: new FormControl(''),
      partieCorps: new FormControl(''),
    });
  }

  onSubmit() {
    // this.validererCoupLongsword();
    // this.coupsService.ajouterCoup(this.nouveauCoup);
    // this.coupStr = this.coupsService.lireCoup(this.nouveauCoup);
    // this.formSaisirCoup.reset();
    // this.nouveauCoup = {};
  }

  validererCoupLongsword() {
    // this.nouveauCoup.attaquant = this.combattants.filter(
    //   (combattant) => combattant.couleur == this.formSaisirCoup.value.attaquant
    // )[0];
    // this.nouveauCoup.defenseur = this.combattants.filter(
    //   (combattant) => combattant.couleur != this.formSaisirCoup.value.attaquant
    // )[0];
    // this.nouveauCoup.vulnerant = VulnerantLongsword.liste.filter(
    //   (elem) => elem.code === this.formSaisirCoup.value.vulnerant
    // )[0];
    // if (VulnerantLongsword.lutte != this.nouveauCoup.vulnerant) {
    //   this.nouveauCoup.partieCorps = PartieCorpsLongsword.liste.filter(
    //     (elem) => elem.code === this.formSaisirCoup.value.partieCorps
    //   )[0];
    // } else {
    //   this.nouveauCoup.partieCorps = PartieCorpsLongsword.lutte;
    // }
  }
}
