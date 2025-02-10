import { Component, Input, input } from '@angular/core';
import { Poule } from '../../shared/models/poule';
import { NomsPipe } from '../../shared/pipes/noms.pipe';
import { ClubPipe } from '../../shared/pipes/club.pipe';

@Component({
  selector: 'app-affichage-poule',
  standalone: true,
  imports: [NomsPipe, ClubPipe],
  templateUrl: './affichage-poule.component.html',
  styleUrl: './affichage-poule.component.css',
})
export class AffichagePouleComponent {
  @Input() poule!: Poule;
}
