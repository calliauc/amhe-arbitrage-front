import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { Ruleset } from '../../../shared/models/ruleset';

@Component({
  selector: 'app-ruleset-afficher',
  standalone: true,
  imports: [NgClass],
  templateUrl: './ruleset-afficher.component.html',
  styleUrl: './ruleset-afficher.component.css',
})
export class RulesetAfficherComponent implements OnInit {
  @Input() ruleset!: Ruleset;
  @Input() estPair!: boolean;
  @Output() editerRuleset: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
    if (this.estPair) return;
    else return;
  }

  editer() {
    this.editerRuleset.emit();
  }
}
