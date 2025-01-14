import { Component, OnInit } from '@angular/core';
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
  listeCoups?: Coup[];

  constructor(private coupsService: CoupsService) {}

  ngOnInit(): void {
    this.refreshList();
    this.coupsService.notification$.subscribe((coup) => this.refreshList());
  }

  refreshList() {
    this.coupsService.getCoups().subscribe((coups) => {
      this.listeCoups = coups;
      console.log(coups);
    });
  }

  suprimerCoup(id: number) {
    this.coupsService.supprimerCoup(id).subscribe((_) => this.refreshList());
  }
}
