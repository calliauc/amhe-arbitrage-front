import { EventEmitter, Injectable, Output } from '@angular/core';
import { Coup } from '../models/coup';
import { Couleurs } from '../models/combattant';
import { VulnerantLongsword } from '../models/vulnerants';
import { PartieCorpsLongsword } from '../models/partie-corps';

@Injectable({
  providedIn: 'root',
})
export class CoupsService {
  @Output() ajoutCoup = new EventEmitter();
  listeCoups: Coup[] = [
    {
      id: 1,
      matchId: 1,
      attaquant: { id: 1, couleur: Couleurs.Bleu },
      defenseur: { id: 2, couleur: Couleurs.Rouge },
      vulnerant: VulnerantLongsword.estoc,
      partieCorps: PartieCorpsLongsword.tete,
    },
    {
      id: 2,
      matchId: 1,
      attaquant: { id: 2, couleur: Couleurs.Rouge },
      defenseur: { id: 1, couleur: Couleurs.Bleu },
      vulnerant: VulnerantLongsword.taille,
      partieCorps: PartieCorpsLongsword.bras,
    },
    {
      id: 3,
      matchId: 1,
      attaquant: { id: 1, couleur: Couleurs.Bleu },
      defenseur: { id: 2, couleur: Couleurs.Rouge },
      vulnerant: VulnerantLongsword.lutte,
      partieCorps: PartieCorpsLongsword.lutte,
    },
    {
      id: 4,
      matchId: 1,
      attaquant: { id: 2, couleur: Couleurs.Rouge },
      defenseur: { id: 1, couleur: Couleurs.Bleu },
      vulnerant: VulnerantLongsword.entaille,
      partieCorps: PartieCorpsLongsword.torse,
    },
  ];

  public getListeCoups(): Coup[] {
    return this.listeCoups;
  }

  ajouterCoup(coupAAjouter: Coup): Coup[] {
    this.listeCoups.push(coupAAjouter);
    this.ajoutCoup.emit(coupAAjouter);
    console.log(coupAAjouter);
    return this.listeCoups;
  }

  suprimerCoup(coupASupprimer: Coup): Coup[] {
    this.listeCoups = this.listeCoups?.filter(
      (coup) => coup.id !== coupASupprimer.id
    );
    return this.listeCoups;
  }

  lireCoup(coup: Coup) {
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
