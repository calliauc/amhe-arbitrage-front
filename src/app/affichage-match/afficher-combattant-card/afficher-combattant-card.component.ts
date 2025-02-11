import { Component, Input, OnInit } from '@angular/core';
import { Combattant } from '../../shared/models/combattant';
import { ClubPipe } from '../../shared/pipes/club.pipe';
import { NomsPipe } from '../../shared/pipes/noms.pipe';

@Component({
  selector: 'app-afficher-combattant-card',
  standalone: true,
  imports: [ClubPipe, NomsPipe],
  templateUrl: './afficher-combattant-card.component.html',
  styleUrl: './afficher-combattant-card.component.css',
})
export class AfficherCombattantCardComponent implements OnInit {
  @Input() combattant!: Combattant;
  @Input() couleur!: string;
  @Input() score!: number;
  border!: string;

  ngOnInit(): void {
    this.border = `3px solid ${this.couleur}`;
  }
}
