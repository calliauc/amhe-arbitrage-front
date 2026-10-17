import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Inscrit } from '../../shared/models/inscrit';
import { NomsPipe } from '../../shared/pipes/noms.pipe';

@Component({
    selector: 'app-afficher-inscrit-card',
    imports: [ NomsPipe],
    templateUrl: './afficher-inscrit-card.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './afficher-inscrit-card.component.css'
})
export class AfficherinscritCardComponent implements OnInit {
  @Input() inscrit!: Inscrit;
  @Input() couleur!: string;
  @Input() score!: number;
  border!: string;

  ngOnInit(): void {
    this.border = `3px solid ${this.couleur}`;
  }
}
