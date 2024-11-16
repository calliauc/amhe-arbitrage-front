import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistoCoup } from '../../../shared/classes/histo-coup';
import { CoupsService } from '../../../shared/services/coups.service';

@Component({
  selector: 'app-ligne-histo-coup',
  standalone: true,
  imports: [],
  templateUrl: './ligne-histo-coup.component.html',
  styleUrl: './ligne-histo-coup.component.css',
})
export class LigneHistoCoupComponent {
  @Input() coup?: HistoCoup;
  @Output() suppressionCoup: EventEmitter<HistoCoup> = new EventEmitter();

  constructor(private coupsService: CoupsService) {}

  lireCoup() {
    if (!!this.coup) return this.coupsService.lireCoup(this.coup);
    return 'Pas de coup valable';
  }
  supprimerCoup() {
    this.suppressionCoup.emit(this.coup);
  }
}
