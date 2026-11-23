import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { Item } from '../../../shared/models/item';
import { RolesNames } from '../../../shared/models/roles';
import { AuthV1Service } from '../../../shared/services/auth-v1.service';

@Component({
    selector: 'app-item-afficher',
    imports: [NgClass],
    templateUrl: './item-afficher.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './item-afficher.component.css'
})
export class ItemAfficherComponent implements OnInit {
  private Auth = AuthV1Service;
  
  @Input() item!: Item;
  @Input() estPair!: boolean;
  @Input() role!: RolesNames;
  @Output() editerItem = new EventEmitter<boolean>();

  ngOnInit(): void {
    if (this.estPair) return;
    else return;
  }

  editer() {
    this.editerItem.emit();
  }
}
