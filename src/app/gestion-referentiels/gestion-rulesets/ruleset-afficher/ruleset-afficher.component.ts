import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { Ruleset } from '../../../shared/models/ruleset';
import { TimerReversePipe } from '../../../shared/pipes/timerReverse.pipe';
import { TimerPipe } from '../../../shared/pipes/timer.pipe';
import { RulsetRefPipe } from '../../../shared/pipes/ruleset-refs.pipe';

@Component({
  selector: 'app-ruleset-afficher',
  standalone: true,
  imports: [NgClass, TimerReversePipe, TimerPipe, RulsetRefPipe],
  templateUrl: './ruleset-afficher.component.html',
  styleUrl: './ruleset-afficher.component.css',
})
export class RulesetAfficherComponent implements OnInit {
  @Input() ruleset!: Ruleset;
  @Input() estPair!: boolean;
  @Input() estLectureSeule!: boolean;
  @Output() editerRuleset: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
    if (this.estPair) return;
    else return;
  }

  editer() {
    this.editerRuleset.emit();
  }
}
