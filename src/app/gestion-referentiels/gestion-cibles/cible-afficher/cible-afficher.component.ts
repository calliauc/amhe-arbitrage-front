import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { RulesetRef } from '../../../shared/models/ruleset-ref';

@Component({
  selector: 'app-cible-afficher',
  standalone: true,
  imports: [NgClass],
  templateUrl: './cible-afficher.component.html',
  styleUrl: './cible-afficher.component.css',
})
export class CibleAfficherComponent implements OnInit {
  @Input() cible!: RulesetRef;
  @Input() estPair!: boolean;
  @Output() editerCible: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
    if (this.estPair) return;
    else return;
  }

  editer() {
    this.editerCible.emit();
  }
}
