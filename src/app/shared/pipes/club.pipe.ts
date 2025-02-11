import { Pipe, PipeTransform } from '@angular/core';
import { Club } from '../../shared/models/club';

@Pipe({
  name: 'clubDisplay',
  standalone: true,
})
export class ClubPipe implements PipeTransform {
  transform(club: Club | undefined, longueur: boolean = false): string {
    if (club && longueur) return `${club.nomComplet} (${club.ville})`;
    if (club) return `${club.nomCourt} (${club.ville})`;
    return 'Pas de club';
  }
}
