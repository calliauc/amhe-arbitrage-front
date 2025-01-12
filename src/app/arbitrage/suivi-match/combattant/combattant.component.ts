import { Component, Input } from '@angular/core';
import { Combattant } from '../../../shared/models/combattant';
import { ClubPipe } from '../../../shared/pipes/club.pipe';

@Component({
  selector: 'app-combattant',
  standalone: true,
  imports: [ClubPipe],
  templateUrl: './combattant.component.html',
  styleUrl: './combattant.component.css',
})
export class CombattantComponent {
  @Input() combattant!: Combattant;
}
