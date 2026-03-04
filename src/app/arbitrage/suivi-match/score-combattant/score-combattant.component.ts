
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-score-combattant',
    imports: [],
    templateUrl: './score-combattant.component.html',
    styleUrl: './score-combattant.component.css'
})
export class ScoreCombattantComponent {
  @Input() score = 0;
  @Input() couleur!: string;
  @Output() scoreEvent = new EventEmitter<number>();

  public modifScore(modif: number) {
    this.score += modif;
    this.scoreEvent.emit(this.score);
  }
}
