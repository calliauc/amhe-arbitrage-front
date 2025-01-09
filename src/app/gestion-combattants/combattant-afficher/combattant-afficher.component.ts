import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Combattant } from '../../shared/classes/combattant';
import { NgClass } from '@angular/common';
import { ClubPipe } from './club.pipe';

@Component({
  selector: 'app-combattant-afficher',
  standalone: true,
  imports: [NgClass, ClubPipe],
  templateUrl: './combattant-afficher.component.html',
  styleUrl: './combattant-afficher.component.css',
})
export class CombattantAfficherComponent implements OnInit {
  @Input() combattant!: Combattant;
  @Input() estPair!: boolean;
  @Output() editerCombattant: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
    if (this.estPair) return;
    else return;
  }

  editer() {
    this.editerCombattant.emit();
  }
}
