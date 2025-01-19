import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-score-combattant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-combattant.component.html',
  styleUrl: './score-combattant.component.css',
})
export class ScoreCombattantComponent {
  @Input() score: number = 0;
  @Input() couleur!: string;
  @Output() scoreEvent: EventEmitter<number> = new EventEmitter();

  public modifScore(modif: number) {
    this.score += modif;
    this.scoreEvent.emit(this.score);
  }
}
