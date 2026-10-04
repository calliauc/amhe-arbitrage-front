import { Component, EventEmitter, Input, OnInit, Output, inject, ChangeDetectionStrategy } from '@angular/core';
import { Combattant } from '../../shared/models/combattant';
import { NgClass } from '@angular/common';
import { ClubPipe } from '../../shared/pipes/club.pipe';
import { Router } from '@angular/router';

@Component({
    selector: 'app-combattant-afficher',
    imports: [NgClass, ClubPipe],
    templateUrl: './combattant-afficher.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './combattant-afficher.component.css'
})
export class CombattantAfficherComponent implements OnInit {
  private router = inject(Router);

  @Input() combattant!: Combattant;
  @Input() estPair!: boolean;
  @Input() estLog!: boolean;
  @Output() editerCombattant = new EventEmitter<boolean>();

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
