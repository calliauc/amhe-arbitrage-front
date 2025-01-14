import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Club } from '../../shared/models/club';
import { NgClass } from '@angular/common';
import { ClubPipe } from '../../shared/pipes/club.pipe';

@Component({
  selector: 'app-club-afficher',
  standalone: true,
  imports: [NgClass, ClubPipe],
  templateUrl: './club-afficher.component.html',
  styleUrl: './club-afficher.component.css',
})
export class ClubAfficherComponent implements OnInit {
  @Input() club!: Club;
  @Input() estPair!: boolean;
  @Output() editerClub: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
    if (this.estPair) return;
    else return;
  }

  editer() {
    this.editerClub.emit();
  }
}
