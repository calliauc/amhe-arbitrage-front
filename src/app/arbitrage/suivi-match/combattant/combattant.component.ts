import { Component, Input } from '@angular/core';
import { Combattant, Couleurs } from '../../../shared/models/combattant';
import { ClubPipe } from '../../../shared/pipes/club.pipe';
import { NomsPipe } from '../../../shared/pipes/noms.pipe';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-combattant',
  standalone: true,
  imports: [ClubPipe, NomsPipe, UpperCasePipe],
  templateUrl: './combattant.component.html',
  styleUrl: './combattant.component.css',
})
export class CombattantComponent {
  @Input() combattant!: Combattant;
  @Input() couleur!: string;
}
