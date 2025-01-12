import { Pipe, PipeTransform } from '@angular/core';
import { Club } from '../models/club';
import { Combattant } from '../models/combattant';

@Pipe({
  name: 'nomsDisplay',
  standalone: true,
})
export class NomsPipe implements PipeTransform {
  transform(combattant: Combattant | undefined): string {
    if (combattant)
      return `${combattant.id}- ${combattant.prenom} ${combattant.nom}`;
    return 'Pas de nom';
  }
}
