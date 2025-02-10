import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Coup } from '../../../shared/models/coup';
import { CoupsService } from '../../../shared/services/coups.service';
import { DatePipe } from '@angular/common';
import { DetailsCoupPipe } from '../../../shared/pipes/details-coup.pipe';

@Component({
  selector: 'app-ligne-coup',
  standalone: true,
  imports: [DatePipe, DetailsCoupPipe],
  templateUrl: './ligne-coup.component.html',
  styleUrl: './ligne-coup.component.css',
})
export class LigneCoupComponent {
  @Input() coup!: Coup;
}
