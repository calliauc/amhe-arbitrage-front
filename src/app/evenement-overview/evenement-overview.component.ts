import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { AuthV1Service } from '../shared/services/auth-v1.service';
import { Evenement } from '../shared/models/evenement';
import { EvenementsService } from '../shared/services/evenements.service';
import { InscritsComponent } from '../inscrits/inscrits.component';
import { GestionMatchsComponent } from '../gestion-matchs/gestion-matchs.component';
import { RolesNames } from '../shared/models/roles';

@Component({
  selector: 'app-evenement-overview',
  imports: [CommonModule, DatePipe],
  templateUrl: './evenement-overview.component.html',
  styleUrl: './evenement-overview.component.css'
})
export class EvenementOverviewComponent implements OnInit {
  evenement?: Evenement;

  ngOnInit() {
    this.evenement = JSON.parse(localStorage.getItem('event') || "{\"id\":0}") as Evenement;    
  }
}
