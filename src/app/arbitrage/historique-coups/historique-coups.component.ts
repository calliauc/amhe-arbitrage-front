import { Component, Input, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { LigneCoupComponent } from './ligne-histo-coup/ligne-coup.component';
import { Coup } from '../../shared/models/coup';
import { CoupsService } from '../../shared/services/coups.service';

@Component({
    selector: 'app-historique-coups',
    imports: [LigneCoupComponent],
    templateUrl: './historique-coups.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './historique-coups.component.css'
})
export class HistoriqueCoupsComponent implements OnInit {
  private coupsService = inject(CoupsService);

  @Input() matchId!: number;
  @Input() estLectureSeule!: boolean;
  listeCoups?: Coup[];

  ngOnInit(): void {
    this.refreshList();
    this.coupsService.notification$.subscribe(() => this.refreshList());
  }

  refreshList() {
    this.coupsService.getCoupsByMatch(this.matchId).subscribe((coups) => {
      this.listeCoups = coups.sort((a: Coup, b: Coup) => b.id - a.id);
      console.log(coups);
    });
  }

  supprimerCoup(id: number) {
    this.coupsService.supprimerCoup(id).subscribe(() => {
      console.log("C'était ma cape 😎");
      this.refreshList();
    });
  }
}
