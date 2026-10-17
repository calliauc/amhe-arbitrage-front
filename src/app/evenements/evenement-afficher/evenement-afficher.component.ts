import { Component, EventEmitter, Input, OnInit, Output, inject, ChangeDetectionStrategy } from '@angular/core';
import { Evenement } from '../../shared/models/evenement';
import { DatePipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-evenement-afficher',
    imports: [NgClass, DatePipe],
    templateUrl: './evenement-afficher.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './evenement-afficher.component.css'
})
export class EvenementAfficherComponent implements OnInit {
  private router = inject(Router);

  @Input() evenement!: Evenement;
  @Input() estPair!: boolean;
  @Input() estLog!: boolean;
  @Output() editerEvenement = new EventEmitter<boolean>();

  ngOnInit(): void {
    if (this.estPair) return;
    else return;
  }

  editer() {
    this.editerEvenement.emit();
  }

  onDetails(id: number) {
    this.router.navigate(['evenement', id]);
  }
}
