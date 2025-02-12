import { Component, Input, OnInit } from '@angular/core';
import { LigneCoupComponent } from './ligne-histo-coup/ligne-coup.component';
import { Coup } from '../../shared/models/coup';
import { CoupsService } from '../../shared/services/coups.service';

@Component({
  selector: 'app-historique-coups',
  standalone: true,
  imports: [LigneCoupComponent],
  templateUrl: './historique-coups.component.html',
  styleUrl: './historique-coups.component.css',
})
export class HistoriqueCoupsComponent implements OnInit {
  @Input() matchId!: number;
  @Input() estLectureSeule!: boolean;
  listeCoups?: Coup[];

  constructor(private coupsService: CoupsService) {}

  ngOnInit(): void {
    this.refreshList();
    this.coupsService.notification$.subscribe((coup) => this.refreshList());
  }

  refreshList() {
    this.coupsService.getCoupsByMatch(this.matchId).subscribe((coups) => {
      this.listeCoups = coups.sort((a: Coup, b: Coup) => b.id - a.id);
      console.log(coups);
    });
  }

  supprimerCoup(id: number) {
    this.coupsService.supprimerCoup(id).subscribe((_) => {
      console.log("C'était ma cape 😎");
      this.refreshList();
    });
  }
}
