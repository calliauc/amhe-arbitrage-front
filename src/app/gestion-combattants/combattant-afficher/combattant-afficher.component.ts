import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Combattant } from '../../shared/models/combattant';
import { NgClass } from '@angular/common';
import { ClubPipe } from '../../shared/pipes/club.pipe';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.estPair) return;
    else return;
  }

  editer() {
    this.editerCombattant.emit();
  }

  onDetails(id: number) {
    this.router.navigate(['combattant', id]);
  }
}
