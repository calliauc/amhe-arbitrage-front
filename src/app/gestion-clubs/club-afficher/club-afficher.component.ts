import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { Club } from '../../shared/models/club';
import { NgClass } from '@angular/common';
import { RolesNames } from '../../shared/models/roles';
import { AuthV1Service } from '../../shared/services/auth-v1.service';

@Component({
    selector: 'app-club-afficher',
    imports: [NgClass],
    templateUrl: './club-afficher.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './club-afficher.component.css'
})
export class ClubAfficherComponent implements OnInit {
  private Auth = AuthV1Service;

  @Input() club!: Club;
  @Input() estPair!: boolean;
  @Input() role!: RolesNames;
  @Output() editerClub = new EventEmitter<boolean>();

  ngOnInit(): void {
    if (this.estPair) return;
    else return;
  }

  editer() {
    this.editerClub.emit();
  }
}
