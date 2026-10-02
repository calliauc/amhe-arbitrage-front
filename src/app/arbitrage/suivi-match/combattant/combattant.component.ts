import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Combattant } from '../../../shared/models/combattant';
import { ClubPipe } from '../../../shared/pipes/club.pipe';
import { NomsPipe } from '../../../shared/pipes/noms.pipe';

@Component({
    selector: 'app-combattant',
    imports: [ClubPipe, NomsPipe],
    templateUrl: './combattant.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './combattant.component.css'
})
export class CombattantComponent {
  @Input() combattant!: Combattant;
  @Input() couleur!: string;
}
