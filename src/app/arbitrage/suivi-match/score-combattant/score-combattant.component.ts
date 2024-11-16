import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-score-combattant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-combattant.component.html',
  styleUrl: './score-combattant.component.css',
})
export class ScoreCombattantComponent {
  @Input() couleur: string = 'bleu';
  score: number = 0;

  public modifScore(modif: number) {
    this.score += modif;
  }
}
