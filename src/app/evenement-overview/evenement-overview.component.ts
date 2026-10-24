import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Evenement } from '../shared/models/evenement';
import { EvenementsService } from '../shared/services/evenements.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-evenement-overview',
  imports: [CommonModule, DatePipe],
  templateUrl: './evenement-overview.component.html',
  styleUrl: './evenement-overview.component.css'
})
export class EvenementOverviewComponent implements OnInit {
  private evenementsService = inject(EvenementsService);
  evenement$?: Observable<Evenement>;

  ngOnInit() {
    this.evenement$ = this.evenementsService.refreshEvent$;
  }
}
