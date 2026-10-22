import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InscritsService } from '../../shared/services/inscrits.service';
import { NomsPipe } from '../../shared/pipes/noms.pipe';
import { Item } from '../../shared/models/item';
import { TagFiltres } from '../../shared/models/tag';
import { CommonModule, DatePipe } from '@angular/common';
import { InscritDetails } from '../../shared/models/inscrit-details';

@Component({
    selector: 'app-inscrit-details',
    imports: [NomsPipe, DatePipe, CommonModule],
    templateUrl: './inscrit-details.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './inscrit-details.component.css'
})
export class InscritDetailsComponent {
  private route = inject(ActivatedRoute);
  private inscritService = inject(InscritsService);
  private router = inject(Router);

  details!: InscritDetails;
  inscritId!: number;
  itemPoule!: Item;
  items: TagFiltres = {
    itemsRequis: [
      {
        id: 1,
        code: 'B-CUP-25',
      },
      {
        id: 2,
        code: 'Epée',
      },
    ],
    itemsOptions: [],
    itemsExclus: [
      {
        id: 3,
        code: 'Hache',
      },
      {
        id: 16,
        code: 'Finale-p',
      },
      {
        id: 17,
        code: 'Finale-g',
      },
    ],
  };

  constructor() {
    this.route.params.subscribe((params) => {
      this.inscritService
        .getInscritsDetails(params['id'], this.items)
        .subscribe((details) => {
          if (details) {
            this.details = details;
            console.log(details);
          } else {
            alert('Inscrit introuvable');
            this.router.navigate(['inscrits']);
          }
          this.trieStats();
        });
      this.inscritId = params['id'];
    });
  }

  trieStats() {
    this.details.coupsMarques.cibles?.sort((a, b) => b.valeur - a.valeur);
    this.details.coupsMarques.vulnerants?.sort((a, b) => b.valeur - a.valeur);
    this.details.coupsMarques.details?.sort((a, b) => b.valeur - a.valeur);
    this.details.coupsSubis.cibles?.sort((a, b) => b.valeur - a.valeur);
    this.details.coupsSubis.vulnerants?.sort((a, b) => b.valeur - a.valeur);
    this.details.coupsSubis.details?.sort((a, b) => b.valeur - a.valeur);
  }

  filtreItems(items: Item[]): Item {
    return items.filter((item) => item.code.startsWith('Poule'))[0];
  }
}
