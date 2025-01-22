import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Coup } from '../../../shared/models/coup';
import { CoupsService } from '../../../shared/services/coups.service';

@Component({
  selector: 'app-ligne-coup',
  standalone: true,
  imports: [],
  templateUrl: './ligne-coup.component.html',
  styleUrl: './ligne-coup.component.css',
})
export class LigneCoupComponent {
  @Input() coup!: Coup;
  // @Output() suppressionCoup: EventEmitter<number> = new EventEmitter();

  constructor(private coupsService: CoupsService) {}

  // supprimerCoup() {
  //   this.suppressionCoup.emit(this.coup.id);
  // }
}
