import { Component } from '@angular/core';
import { Combattant } from '../../shared/models/combattant';
import { ActivatedRoute, Router } from '@angular/router';
import { CombattantsService } from '../../shared/services/combattants.service';
import { NomsPipe } from '../../shared/pipes/noms.pipe';
import { Tag, TagsFiltres } from '../../shared/models/tag';
import { CombattantDetails } from '../../shared/models/combattant-details';
import { CommonModule, DatePipe } from '@angular/common';
import { ClubPipe } from '../../shared/pipes/club.pipe';

@Component({
  selector: 'app-combattant-details',
  standalone: true,
  imports: [NomsPipe, DatePipe, ClubPipe, CommonModule],
  templateUrl: './combattant-details.component.html',
  styleUrl: './combattant-details.component.css',
})
export class CombattantDetailsComponent {
  details!: CombattantDetails;
  combattantId!: number;
  tagPoule!: Tag;
  tags: TagsFiltres = {
    tagsRequis: [
      {
        id: 1,
        code: 'B-CUP-25',
      },
      {
        id: 2,
        code: 'Epée',
      },
    ],
    tagsOptions: [],
    tagsExclus: [
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

  constructor(
    private route: ActivatedRoute,
    private combattantService: CombattantsService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.combattantService
        .getCombattantsDetails(params['id'], this.tags)
        .subscribe((details) => {
          if (details) {
            this.details = details;
            console.log(details);
          } else {
            alert('Combattant introuvable');
            this.router.navigate(['combattants']);
          }
          this.trieStats();
        });
      this.combattantId = params['id'];
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

  filtreTags(tags: Tag[]): Tag {
    return tags.filter((tag) => tag.code.startsWith('Poule'))[0];
  }
}
