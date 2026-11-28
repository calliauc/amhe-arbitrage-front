import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InscritsService } from '../../shared/services/inscrits.service';
import { NomsPipe } from '../../shared/pipes/noms.pipe';
import { Item } from '../../shared/models/item';
import { TagFiltres } from '../../shared/models/tag';
import { CommonModule, DatePipe } from '@angular/common';
import { InscritDetails } from '../../shared/models/inscrit-details';
import { Inscrit } from '../../shared/models/inscrit';
import { first, forkJoin, map, pluck, tap } from 'rxjs';

@Component({
    selector: 'app-inscrit-details',
    imports: [CommonModule],
    templateUrl: './inscrit-details.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './inscrit-details.component.css'
})
export class InscritDetailsComponent {
  private route = inject(ActivatedRoute);
  private inscritService = inject(InscritsService);
  private router = inject(Router);

  details!: InscritDetails;
  inscrit!: Inscrit;


  constructor() {
    this.route.params
    .subscribe(params => this.inscritService.getInscritsDetails(params['id'])
    .subscribe(details => this.details=details));
  }

  trieStats() {
    this.details.coupsMarques.cibles?.sort((a, b) => b.valeur - a.valeur);
    this.details.coupsMarques.vulnerants?.sort((a, b) => b.valeur - a.valeur);
    this.details.coupsMarques.details?.sort((a, b) => b.valeur - a.valeur);
    this.details.coupsSubis.cibles?.sort((a, b) => b.valeur - a.valeur);
    this.details.coupsSubis.vulnerants?.sort((a, b) => b.valeur - a.valeur);
    this.details.coupsSubis.details?.sort((a, b) => b.valeur - a.valeur);
  }
}
