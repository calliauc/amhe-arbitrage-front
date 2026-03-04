import { Component, Input } from '@angular/core';
import { Combattant } from '../../../shared/models/combattant';
import { ClubPipe } from '../../../shared/pipes/club.pipe';
import { NomsPipe } from '../../../shared/pipes/noms.pipe';

@Component({
    selector: 'app-combattant',
    imports: [ClubPipe, NomsPipe],
    templateUrl: './combattant.component.html',
    styleUrl: './combattant.component.css'
})
export class CombattantComponent {
  @Input() combattant!: Combattant;
  @Input() couleur!: string;
}
