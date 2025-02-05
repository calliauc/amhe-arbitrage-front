import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Match } from '../../shared/models/match';
import { ClubPipe } from '../../shared/pipes/club.pipe';
import { NomsPipe } from '../../shared/pipes/noms.pipe';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component';
import { DatePipe } from '@angular/common';
import { MatchsService } from '../../shared/services/matchs.service';
import { Router, RouterLink } from '@angular/router';
import { TimerPipe } from '../../shared/pipes/timer.pipe';

@Component({
  selector: 'app-match-afficher',
  standalone: true,
  imports: [
    RouterLink,
    ClubPipe,
    NomsPipe,
    ConfirmationModalComponent,
    DatePipe,
    TimerPipe,
  ],
  templateUrl: './match-afficher.component.html',
  styleUrl: './match-afficher.component.css',
})
export class MatchAfficherComponent {
  @Input() match!: Match;
  @Output() matchEvent: EventEmitter<null> = new EventEmitter();

  estModalVisible: boolean = false;
  titreModal: string = 'Confirmer la suppression ?';
  texteModal: string = 'Cette action est définitive';

  constructor(private matchsService: MatchsService, private router: Router) {}

  demanderSuppression(id: number): void {
    this.estModalVisible = true;
  }

  confirmerSuppression(id: number | string) {
    this.estModalVisible = false;
    this.matchsService
      .supprimerMatch(id as number)
      .subscribe((_) => this.matchEvent.emit());
  }

  annulerSuppression() {
    this.estModalVisible = false;
  }
}
