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

  public getListeCoups(): Coup[] {
    return [];
  }

  ajouterCoup(coupAAjouter: Coup): Coup {
    this.ajoutCoup.emit(coupAAjouter);
    return coupAAjouter;
  }

  suprimerCoup(coupASupprimer: Coup) {}

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
