import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Combattant } from '../../shared/models/combattant';
import { NgClass } from '@angular/common';
import { ClubPipe } from '../../shared/pipes/club.pipe';

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
  @Input() estLectureSeule!: boolean;
  @Output() editerCombattant: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
    if (this.estPair) return;
    else return;
  }

  editer() {
    this.editerCombattant.emit();
  }
}
