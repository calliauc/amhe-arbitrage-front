import { Component, EventEmitter, Input, Output, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Match } from '../../shared/models/match';
import { NomsPipe } from '../../shared/pipes/noms.pipe';
import { ConfirmationModalComponent } from '../../shared/modales/confirmation-modal/confirmation-modal.component';
import { DatePipe } from '@angular/common';
import { MatchsService } from '../../shared/services/matchs.service';
import { RouterLink } from '@angular/router';
import { TimerPipe } from '../../shared/pipes/timer.pipe';
import { QRCodeComponent } from 'angularx-qrcode';
import { RolesNames } from '../../shared/models/roles';
import { AuthV1Service } from '../../shared/services/auth-v1.service';
import { couleurs } from '../../shared/models/ruleset-ref';

@Component({
    selector: 'app-match-afficher',
    imports: [
        RouterLink,
        NomsPipe,
        ConfirmationModalComponent,
        DatePipe,
        TimerPipe,
        QRCodeComponent,
    ],
    templateUrl: './match-afficher.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './match-afficher.component.css'
})
export class MatchAfficherComponent implements OnInit {
  private Auth = AuthV1Service;
  private matchsService = inject(MatchsService);

  @Input() match!: Match;
  @Input() role!: RolesNames;
  @Output() matchEvent = new EventEmitter<null>();

  estModalVisible = false;
  titreModal = 'Confirmer la suppression ?';
  texteModal = 'Cette action est définitive';
  url = 'https://amhe.makhai.fr/match/';
  qrCodeVisible = false;
  couleurs = couleurs;
  

  ngOnInit(): void {
    this.url += this.match.id;
    if (this.Auth.estArbitre(this.role)){
      this.url +="/arbitrage";
    } else {
      this.url +="/details";
    }
  }

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

  afficherQrCode(){
    this.qrCodeVisible = true;
  }

  masquerQrCode(){
    this.qrCodeVisible = false;
  }
}
