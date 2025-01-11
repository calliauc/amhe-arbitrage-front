import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Combattant } from '../../../shared/models/combattant';

@Component({
  selector: 'app-score-combattant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-combattant.component.html',
  styleUrl: './score-combattant.component.css',
})
export class ScoreCombattantComponent {
  @Input() score: number = 0;
  @Input() couleur: string = 'bleu';

  public modifScore(modif: number) {
    this.score += modif;
  }
}
