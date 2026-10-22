import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { Item } from '../../../shared/models/item';
import { RolesNames } from '../../../shared/models/roles';
import { AuthV1Service } from '../../../shared/services/auth-v1.service';

@Component({
    selector: 'app-vulnerant-afficher',
    imports: [NgClass],
    templateUrl: './vulnerant-afficher.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './vulnerant-afficher.component.css'
})
export class VulnerantAfficherComponent implements OnInit {
  private Auth = AuthV1Service;
  
  @Input() vulnerant!: Item;
  @Input() estPair!: boolean;
  @Input() role!: RolesNames;
  @Output() editerVulnerant = new EventEmitter<boolean>();

  ngOnInit(): void {
    if (this.estPair) return;
    else return;
  }

  editer() {
    this.editerVulnerant.emit();
  }
}
