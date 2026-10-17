import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Inscrit } from '../../../shared/models/inscrit';
import { NomsPipe } from '../../../shared/pipes/noms.pipe';

@Component({
    selector: 'app-inscrit-match',
    imports: [ NomsPipe],
    templateUrl: './inscrit-match.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './inscrit-match.component.css'
})
export class InscritMatchComponent {
  @Input() inscrit!: Inscrit;
  @Input() couleur!: string;
}
