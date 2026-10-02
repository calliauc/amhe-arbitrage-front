import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Coup } from '../../../shared/models/coup';
import { DatePipe } from '@angular/common';
import { DetailsCoupPipe } from '../../../shared/pipes/details-coup.pipe';

@Component({
    selector: 'app-ligne-coup',
    imports: [DatePipe, DetailsCoupPipe],
    templateUrl: './ligne-coup.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './ligne-coup.component.css'
})
export class LigneCoupComponent {
  @Input() coup!: Coup;
}
