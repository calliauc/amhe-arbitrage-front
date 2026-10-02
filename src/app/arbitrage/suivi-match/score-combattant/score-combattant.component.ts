
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-score-combattant',
    imports: [],
    templateUrl: './score-combattant.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
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
