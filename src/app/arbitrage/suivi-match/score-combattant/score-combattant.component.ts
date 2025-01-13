import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Combattant } from '../../../shared/models/combattant';
import { CombattantsService } from '../../../shared/services/combattants.service';

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
  @Output() scoreEvent: EventEmitter<number> = new EventEmitter();

  public modifScore(modif: number) {
    this.score += modif;
    this.scoreEvent.emit(this.score);
  }
}
