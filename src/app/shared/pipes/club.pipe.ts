import { Pipe, PipeTransform } from '@angular/core';
import { Club } from '../../shared/models/club';

@Pipe({
  name: 'clubDisplay',
  standalone: true,
})
export class ClubPipe implements PipeTransform {
  transform(club: Club | undefined): string {
    if (club) return `${club.nomComplet} (${club.ville})`;
    return 'Pas de club';
  }
}
