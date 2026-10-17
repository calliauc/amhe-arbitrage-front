import { Pipe, PipeTransform } from '@angular/core';
import { Inscrit } from '../models/inscrit';

@Pipe({
  name: 'nomsDisplay',
  standalone: true,
})
export class NomsPipe implements PipeTransform {
  transform(
    inscrit: Inscrit | undefined,
    complet = false
  ): string {
    if (inscrit && inscrit.pseudo && complet)
      return `${inscrit.prenom} ${inscrit.nom} '${inscrit.pseudo}'`;
    if (inscrit) return `${inscrit.prenom} ${inscrit.nom}`;
    return 'Pas de nom';
  }
}
