import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css',
})
export class ConfirmationModalComponent {
  @Input() id!: number;
  @Input() titre: string = "Confirmer l'action ?";
  @Input() texte: string = 'Pour de vrai de vrai ? Pinkie promesse ?';
  @Output() confirmer = new EventEmitter<number>();
  @Output() annuler = new EventEmitter<boolean>();

  confirmerAction() {
    this.confirmer.emit(this.id);
  }
  annulerAction(): void {
    this.annuler.emit(true);
  }
}
