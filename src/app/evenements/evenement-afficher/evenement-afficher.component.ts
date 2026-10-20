import { Component, EventEmitter, Input, OnInit, Output, inject, ChangeDetectionStrategy } from '@angular/core';
import { Evenement } from '../../shared/models/evenement';
import { DatePipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { RolesNames } from '../../shared/models/roles';
import { AuthV1Service } from '../../shared/services/auth-v1.service';

@Component({
    selector: 'app-evenement-afficher',
    imports: [NgClass, DatePipe],
    templateUrl: './evenement-afficher.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './evenement-afficher.component.css'
})
export class EvenementAfficherComponent implements OnInit {
  private router = inject(Router);
  private Auth = AuthV1Service;

  @Input() evenement!: Evenement;
  @Input() estPair!: boolean;
  @Input() role!: RolesNames;
  @Output() editerEvenement = new EventEmitter<boolean>();

  ngOnInit(): void {
    if (this.estPair) return;
    else return;
  }

  editer() {
    this.editerEvenement.emit();
  }

  onDetails(event: Evenement) {
    localStorage.setItem('event', JSON.stringify(event))
    let origin = localStorage.getItem('origin-page')|| 'evenement';
    localStorage.removeItem('origin-page');
    this.router.navigate([origin]);
  }
}
