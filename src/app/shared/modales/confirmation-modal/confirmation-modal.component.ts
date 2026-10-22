import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-confirmation-modal',
    imports: [],
    templateUrl: './confirmation-modal.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
  @Input() id!: number;
  @Input() code = '';
  @Input() titre = "Confirmer l'action ?";
  @Input() texte = 'Pour de vrai de vrai ? Pinkie promesse ?';
  @Output() confirmer = new EventEmitter<number>();
  @Output() annuler = new EventEmitter<boolean>();

  confirmerAction() {
    this.confirmer.emit(this.id);
  }
  annulerAction(): void {
    this.annuler.emit(true);
  }
}
