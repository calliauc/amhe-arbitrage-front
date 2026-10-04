import { Component, EventEmitter, Input, Output, inject, ChangeDetectionStrategy } from '@angular/core';
import { Match } from '../../shared/models/match';
import { ClubPipe } from '../../shared/pipes/club.pipe';
import { NomsPipe } from '../../shared/pipes/noms.pipe';
import { ConfirmationModalComponent } from '../../shared/modales/confirmation-modal/confirmation-modal.component';
import { DatePipe } from '@angular/common';
import { MatchsService } from '../../shared/services/matchs.service';
import { Router, RouterLink } from '@angular/router';
import { TimerPipe } from '../../shared/pipes/timer.pipe';

@Component({
    selector: 'app-match-afficher',
    imports: [
        RouterLink,
        ClubPipe,
        NomsPipe,
        ConfirmationModalComponent,
        DatePipe,
        TimerPipe,
    ],
    templateUrl: './match-afficher.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './match-afficher.component.css'
})
export class MatchAfficherComponent {
  private matchsService = inject(MatchsService);
  private router = inject(Router);

  @Input() match!: Match;
  @Input() estLog!: boolean;
  @Output() matchEvent = new EventEmitter<null>();

  estModalVisible = false;
  titreModal = 'Confirmer la suppression ?';
  texteModal = 'Cette action est définitive';

  demanderSuppression(): void {
    this.estModalVisible = true;
  }

  confirmerSuppression(id: number | string) {
    this.estModalVisible = false;
    this.matchsService
      .supprimerMatch(id as number)
      .subscribe(() => this.matchEvent.emit());
  }

  annulerSuppression() {
    this.estModalVisible = false;
  }
}
