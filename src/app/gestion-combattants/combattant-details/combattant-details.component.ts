import { Component } from '@angular/core';
import { Combattant } from '../../shared/models/combattant';
import { ActivatedRoute, Router } from '@angular/router';
import { CombattantsService } from '../../shared/services/combattants.service';
import { NomsPipe } from '../../shared/pipes/noms.pipe';

@Component({
  selector: 'app-combattant-details',
  standalone: true,
  imports: [NomsPipe],
  templateUrl: './combattant-details.component.html',
  styleUrl: './combattant-details.component.css',
})
export class CombattantDetailsComponent {
  combattant!: Combattant;
  combattantId!: number;

  constructor(
    private route: ActivatedRoute,
    private combattantService: CombattantsService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.combattantService
        .getCombattantById(params['id'])
        .subscribe((combattant) => {
          if (combattant) {
            this.combattant = combattant;
            console.log(combattant);
          } else {
            alert('Combattant introuvable');
            this.router.navigate(['combattants']);
          }
        });
      this.combattantId = params['id'];
    });
  }
}
