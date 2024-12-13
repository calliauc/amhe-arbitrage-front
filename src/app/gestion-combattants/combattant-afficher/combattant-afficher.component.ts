import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Combattant } from '../../shared/classes/combattant';

@Component({
  selector: 'app-combattant-afficher',
  standalone: true,
  imports: [],
  templateUrl: './combattant-afficher.component.html',
  styleUrl: './combattant-afficher.component.css',
})
export class CombattantAfficherComponent {
  @Input() combattant!: Combattant;
  @Output() editerCombattant: EventEmitter<boolean> = new EventEmitter();

  editer() {
    this.editerCombattant.emit();
  }
}
