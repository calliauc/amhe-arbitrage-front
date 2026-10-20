import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { Tag } from '../../../shared/models/tag';
import { RolesNames } from '../../../shared/models/roles';
import { AuthV1Service } from '../../../shared/services/auth-v1.service';

@Component({
    selector: 'app-tag-afficher',
    imports: [NgClass],
    templateUrl: './tag-afficher.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './tag-afficher.component.css'
})
export class TagAfficherComponent implements OnInit {
  private Auth = AuthV1Service;
  
  @Input() tag!: Tag;
  @Input() estPair!: boolean;
  @Input() role!: RolesNames;
  @Output() editerTag = new EventEmitter<boolean>();

  ngOnInit(): void {
    if (this.estPair) return;
    else return;
  }

  editer() {
    this.editerTag.emit();
  }
}
