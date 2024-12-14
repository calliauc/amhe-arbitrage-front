import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Combattant } from '../../shared/classes/combattant';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-combattant-editer',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './combattant-editer.component.html',
  styleUrl: './combattant-editer.component.css',
})
export class CombattantEditerComponent implements OnInit {
  @Input() combattant: Combattant = new Combattant();
  @Input() estPair!: boolean;
  @Output() annulerEdition: EventEmitter<boolean> = new EventEmitter();
  @Output() validerEdition: EventEmitter<Combattant> = new EventEmitter();

  ereurSaisie: boolean;
  formEditerCombattant!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.ereurSaisie = false;
  }

  ngOnInit(): void {
    this.formEditerCombattant = this.formBuilder.group({
      prenom: this.combattant?.prenom,
      nom: this.combattant?.nom,
      pseudo: this.combattant?.pseudo,
    });
  }

  annuler(): void {
    this.annulerEdition.emit(true);
  }

  confirmer(): void {
    this.ereurSaisie = false;
    this.combattant = this.formEditerCombattant.value;
    if (this.verifierCombattant(this.combattant)) {
      this.validerEdition.emit(this.combattant);
    } else {
      this.ereurSaisie = true;
      setTimeout(() => {
        this.ereurSaisie = false;
      }, 3000);
    }
  }

  verifierCombattant(combattant: Combattant): boolean {
    return !!combattant.prenom && !!combattant.nom && !!combattant.pseudo;
  }
}
