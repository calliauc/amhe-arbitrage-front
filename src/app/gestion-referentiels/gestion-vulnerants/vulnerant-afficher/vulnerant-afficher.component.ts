import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { RulesetRef } from '../../../shared/models/ruleset-ref';

@Component({
  selector: 'app-vulnerant-afficher',
  standalone: true,
  imports: [NgClass],
  templateUrl: './vulnerant-afficher.component.html',
  styleUrl: './vulnerant-afficher.component.css',
})
export class VulnerantAfficherComponent implements OnInit {
  @Input() vulnerant!: RulesetRef;
  @Input() estPair!: boolean;
  @Output() editerVulnerant: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
    if (this.estPair) return;
    else return;
  }

  editer() {
    this.editerVulnerant.emit();
  }
}
