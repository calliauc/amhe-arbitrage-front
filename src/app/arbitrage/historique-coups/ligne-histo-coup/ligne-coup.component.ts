import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Echange } from '../../../shared/models/echange';
import { DatePipe } from '@angular/common';
import { DetailsEchangePipe } from '../../../shared/pipes/details-coup.pipe';

@Component({
    selector: 'app-ligne-coup',
    imports: [ DatePipe ],
    templateUrl: './ligne-coup.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './ligne-coup.component.css'
})
export class LigneCoupComponent {
  @Input() echange!: Echange;
}
