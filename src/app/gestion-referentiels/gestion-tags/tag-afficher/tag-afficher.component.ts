import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { Tag } from '../../../shared/models/tag';

@Component({
    selector: 'app-tag-afficher',
    imports: [NgClass],
    templateUrl: './tag-afficher.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './tag-afficher.component.css'
})
export class TagAfficherComponent implements OnInit {
  @Input() tag!: Tag;
  @Input() estPair!: boolean;
  @Input() estLog!: boolean;
  @Output() editerTag = new EventEmitter<boolean>();

  ngOnInit(): void {
    if (this.estPair) return;
    else return;
  }

  editer() {
    this.editerTag.emit();
  }
}
