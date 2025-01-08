import { EventEmitter, Injectable, Output } from '@angular/core';
import { HistoCoup } from '../classes/histo-coup';
import { Couleurs } from '../classes/combattant';
import { VulnerantLongsword } from '../classes/vulnerants';
import { PartieCorpsLongsword } from '../classes/partieCorps';

@Injectable({
  providedIn: 'root',
})
export class CoupsService {
  @Output() ajoutCoup = new EventEmitter();
  listeCoups: HistoCoup[] = [
    {
      id: 1,
      attaquant: { id: 1, couleur: Couleurs.Bleu },
      defenseur: { id: 2, couleur: Couleurs.Rouge },
      vulnerant: VulnerantLongsword.estoc,
      partieCorps: PartieCorpsLongsword.tete,
    },
    {
      id: 2,
      attaquant: { id: 2, couleur: Couleurs.Rouge },
      defenseur: { id: 1, couleur: Couleurs.Bleu },
      vulnerant: VulnerantLongsword.taille,
      partieCorps: PartieCorpsLongsword.bras,
    },
    {
      id: 3,
      attaquant: { id: 1, couleur: Couleurs.Bleu },
      defenseur: { id: 2, couleur: Couleurs.Rouge },
      vulnerant: VulnerantLongsword.lutte,
      partieCorps: PartieCorpsLongsword.lutte,
    },
    {
      id: 4,
      attaquant: { id: 2, couleur: Couleurs.Rouge },
      defenseur: { id: 1, couleur: Couleurs.Bleu },
      vulnerant: VulnerantLongsword.entaille,
      partieCorps: PartieCorpsLongsword.torse,
    },
  ];

  public getListeCoups(): HistoCoup[] {
    return this.listeCoups;
  }

  ajouterCoup(coupAAjouter: HistoCoup): HistoCoup[] {
    this.listeCoups.push(coupAAjouter);
    this.ajoutCoup.emit(coupAAjouter);
    console.log(coupAAjouter);
    return this.listeCoups;
  }

  suprimerCoup(coupASupprimer: HistoCoup): HistoCoup[] {
    this.listeCoups = this.listeCoups?.filter(
      (coup) => coup.id !== coupASupprimer.id
    );
    return this.listeCoups;
  }

  lireCoup(coup: HistoCoup) {
    let coupStr: string = '';
    if (!!coup) {
      coupStr += coup.attaquant?.couleur;
      coupStr += coup.vulnerant?.libelle;
      coupStr += coup.partieCorps?.libelle;
      coupStr += coup.defenseur?.couleur;
    }
    return coupStr;
  }
}
