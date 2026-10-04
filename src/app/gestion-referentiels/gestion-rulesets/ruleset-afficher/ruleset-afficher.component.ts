import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { Ruleset } from '../../../shared/models/ruleset';
import { TimerReversePipe } from '../../../shared/pipes/timerReverse.pipe';
import { TimerPipe } from '../../../shared/pipes/timer.pipe';
import { RulsetRefPipe } from '../../../shared/pipes/ruleset-refs.pipe';

@Component({
    selector: 'app-ruleset-afficher',
    imports: [NgClass, TimerReversePipe, TimerPipe, RulsetRefPipe],
    templateUrl: './ruleset-afficher.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './ruleset-afficher.component.css'
})
export class RulesetAfficherComponent implements OnInit {
  @Input() ruleset!: Ruleset;
  @Input() estPair!: boolean;
  @Input() estLog!: boolean;
  @Output() editerRuleset = new EventEmitter<boolean>();

  ngOnInit(): void {
    if (this.estPair) return;
    else return;
  }

  editer() {
    this.editerRuleset.emit();
  }
}
