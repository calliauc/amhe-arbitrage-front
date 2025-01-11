import { Component, Input } from '@angular/core';
import { Combattant } from '../../../shared/models/combattant';

@Component({
  selector: 'app-combattant',
  standalone: true,
  imports: [],
  templateUrl: './combattant.component.html',
  styleUrl: './combattant.component.css',
})
export class CombattantComponent {
  @Input() combattant!: Combattant;
}
