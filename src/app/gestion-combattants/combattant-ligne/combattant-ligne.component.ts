import { Component, Input } from '@angular/core';
import { Combattant } from '../../shared/classes/combattant';

@Component({
  selector: 'app-combattant-ligne',
  standalone: true,
  imports: [],
  templateUrl: './combattant-ligne.component.html',
  styleUrl: './combattant-ligne.component.css',
})
export class CombattantLigneComponent {
  @Input() combattant?: Combattant;
}
