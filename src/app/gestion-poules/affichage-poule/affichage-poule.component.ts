import {
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
  Output,
} from '@angular/core';
import { Poule } from '../../shared/models/poule';
import { NomsPipe } from '../../shared/pipes/noms.pipe';
import { ClubPipe } from '../../shared/pipes/club.pipe';
import { CombattantsService } from '../../shared/services/combattants.service';
import { Combattant } from '../../shared/models/combattant';
import { SecuModalComponent } from '../../shared/modales/secu-modal/secu-modal.component';

@Component({
  selector: 'app-affichage-poule',
  standalone: true,
  imports: [NomsPipe, ClubPipe],
  templateUrl: './affichage-poule.component.html',
  styleUrl: './affichage-poule.component.css',
})
export class AffichagePouleComponent implements OnInit {
  @Input() poule!: Poule;
  @Input() estLectureSeule!: boolean;
  @Output() supprimer = new EventEmitter<number>();
  combattants!: Combattant[];

  constructor(private combattantsService: CombattantsService) {}

  ngOnInit(): void {
    this.combattantsService
      .getCombattantsByTagsMatchs(this.poule.tags)
      .subscribe((c) => (this.combattants = c));
  }

  onSupprimer() {
    this.supprimer.emit(this.poule.id);
  }
}
