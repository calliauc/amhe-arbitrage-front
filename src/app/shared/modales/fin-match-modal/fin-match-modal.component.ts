import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Inscrit } from '../../models/inscrit';

@Component({
    selector: 'app-fin-match-modal',
    imports: [],
    templateUrl: './fin-match-modal.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './fin-match-modal.component.css'
})
export class FinMatchModalComponent {
  @Input() a!: Inscrit;
  @Input() b!: Inscrit;
  @Input() titre = "Saisie résultat";
  @Input() texte = "Quelle est l'issue du match ?";
  @Output() resultat = new EventEmitter<Inscrit>();
  @Output() matchNull = new EventEmitter<boolean>();
  @Output() annuler = new EventEmitter<null>();

  saisieResultat(inscrit: Inscrit) {
    this.resultat.emit(inscrit);
  }

  saisieMatchNull(egalite: boolean): void {
    this.matchNull.emit(egalite);
  }

  annulerAction(): void {
    this.annuler.emit();
  }
}
