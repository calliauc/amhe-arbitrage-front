import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Club } from '../../shared/models/club';
import { ClubAfficherComponent } from '../club-afficher/club-afficher.component';
import { ClubEditerComponent } from '../club-editer/club-editer.component';

@Component({
  selector: 'app-club-ligne',
  standalone: true,
  imports: [ClubAfficherComponent, ClubEditerComponent],
  templateUrl: './club-ligne.component.html',
  styleUrl: './club-ligne.component.css',
})
export class ClubLigneComponent {
  @Input() club!: Club;
  @Input() estPair!: boolean;
  @Output() supprimerClub: EventEmitter<number> = new EventEmitter();
  @Output() modifierClub: EventEmitter<Club> = new EventEmitter();
  estModif: boolean;

  constructor() {
    this.estModif = false;
  }

  lancerEdition(): void {
    this.estModif = true;
  }

  modifClubAnnulee() {
    this.estModif = false;
  }

  suppressionClub(id: number) {
    this.estModif = false;
    this.supprimerClub.emit(id);
  }

  modifClubTerminee(clubModifie: Club) {
    this.modifierClub.emit(clubModifie);
    this.estModif = false;
  }
}
