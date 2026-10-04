import { Component, EventEmitter, Input, OnInit, Output, inject, ChangeDetectionStrategy } from '@angular/core';
import { Poule } from '../../shared/models/poule';
import { NomsPipe } from '../../shared/pipes/noms.pipe';
import { ClubPipe } from '../../shared/pipes/club.pipe';
import { CombattantsService } from '../../shared/services/combattants.service';
import { Combattant } from '../../shared/models/combattant';

@Component({
    selector: 'app-affichage-poule',
    imports: [NomsPipe, ClubPipe],
    templateUrl: './affichage-poule.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './affichage-poule.component.css'
})
export class AffichagePouleComponent implements OnInit {
  private combattantsService = inject(CombattantsService);

  @Input() poule!: Poule;
  @Input() estLog!: boolean;
  @Output() supprimer = new EventEmitter<number>();
  combattants!: Combattant[];

  ngOnInit(): void {
    this.combattantsService
      .getCombattantsByTagsMatchs(this.poule.tags)
      .subscribe((c) => (this.combattants = c));
  }

  onSupprimer() {
    this.supprimer.emit(this.poule.id);
  }
}
