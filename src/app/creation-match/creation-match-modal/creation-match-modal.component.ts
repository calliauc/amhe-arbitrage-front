import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-creation-match-modal',
  standalone: true,
  imports: [],
  templateUrl: './creation-match-modal.component.html',
  styleUrl: './creation-match-modal.component.css',
})
export class CreationMatchModalComponent {
  @Input() titre: string = "Confirmer l'action ?";
  @Input() texte: string = 'Pour de vrai de vrai ? Pinkie promesse ?';
  @Output() confirmer = new EventEmitter<string>();
  @Output() annuler = new EventEmitter<boolean>();

  annulerCreation(): void {
    this.annuler.emit(true);
  }

  liste() {
    this.confirmer.emit('liste');
  }
  rester() {
    this.confirmer.emit('rester');
  }
  arbitrer() {
    this.confirmer.emit('arbitrer');
  }
}
