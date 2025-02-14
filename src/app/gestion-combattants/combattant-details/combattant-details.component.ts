import { Component } from '@angular/core';
import { Combattant } from '../../shared/models/combattant';
import { ActivatedRoute, Router } from '@angular/router';
import { CombattantsService } from '../../shared/services/combattants.service';
import { NomsPipe } from '../../shared/pipes/noms.pipe';
import { TagsFiltres } from '../../shared/models/tag';
import { CombattantDetails } from '../../shared/models/combattant-details';

@Component({
  selector: 'app-combattant-details',
  standalone: true,
  imports: [NomsPipe],
  templateUrl: './combattant-details.component.html',
  styleUrl: './combattant-details.component.css',
})
export class CombattantDetailsComponent {
  details!: CombattantDetails;
  combattantId!: number;
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
    tagsOptions: [
      {
        id: 10,
        code: 'Poule-11',
      },
      {
        id: 11,
        code: 'Poule-12',
      },
    ],
    tagsExclus: [
      {
        id: 3,
        code: 'Hache',
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
        });
      this.combattantId = params['id'];
    });
  }
}
