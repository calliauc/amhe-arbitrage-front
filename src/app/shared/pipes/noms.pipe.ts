import { Pipe, PipeTransform } from '@angular/core';
import { Combattant } from '../models/combattant';

@Pipe({
  name: 'nomsDisplay',
  standalone: true,
})
export class NomsPipe implements PipeTransform {
  transform(
    combattant: Combattant | undefined,
    complet = false
  ): string {
    if (combattant && combattant.pseudo && complet)
      return `${combattant.prenom} ${combattant.nom} '${combattant.pseudo}'`;
    if (combattant) return `${combattant.prenom} ${combattant.nom}`;
    return 'Pas de nom';
  }
}
