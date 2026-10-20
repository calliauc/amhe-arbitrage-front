import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { RulesetRef } from '../../../shared/models/ruleset-ref';
import { RolesNames } from '../../../shared/models/roles';
import { AuthV1Service } from '../../../shared/services/auth-v1.service';

@Component({
    selector: 'app-cible-afficher',
    imports: [NgClass],
    templateUrl: './cible-afficher.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './cible-afficher.component.css'
})
export class CibleAfficherComponent implements OnInit {
  private Auth = AuthV1Service;
  
  @Input() cible!: RulesetRef;
  @Input() estPair!: boolean;
  @Input() role!: RolesNames;
  @Output() editerCible = new EventEmitter<boolean>();

  ngOnInit(): void {
    if (this.estPair) return;
    else return;
  }

  editer() {
    this.editerCible.emit();
  }
}
