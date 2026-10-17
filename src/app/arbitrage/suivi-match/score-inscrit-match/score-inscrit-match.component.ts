
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-score-inscrit-match',
    imports: [],
    templateUrl: './score-inscrit-match.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './score-inscrit-match.component.css'
})
export class ScoreInscritMatchComponent {
  @Input() score = 0;
  @Input() couleur!: string;
  @Output() scoreEvent = new EventEmitter<number>();

  public modifScore(modif: number) {
    this.score += modif;
    this.scoreEvent.emit(this.score);
  }
}
