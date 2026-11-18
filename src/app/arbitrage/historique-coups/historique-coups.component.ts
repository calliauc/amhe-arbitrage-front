import { Component, Input, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { LigneCoupComponent } from './ligne-histo-coup/ligne-coup.component';
import { Echange } from '../../shared/models/echange';
import { EchangesService } from '../../shared/services/echanges.service';
import { RolesNames } from '../../shared/models/roles';
import { AuthV1Service } from '../../shared/services/auth-v1.service';

@Component({
    selector: 'app-historique-coups',
    imports: [LigneCoupComponent],
    templateUrl: './historique-coups.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './historique-coups.component.css'
})
export class HistoriqueCoupsComponent implements OnInit {
  private Auth = AuthV1Service;
  private echangesServices = inject(EchangesService);

  @Input() matchId!: number;
  @Input() role!: RolesNames;
  listeCoups?: Echange[];

  ngOnInit(): void {
    this.refreshList();
    // this.echangesServices.notification$.subscribe((echange) => this.refreshList());
    this.echangesServices.notification$.subscribe((echange) => this.listeCoups?.unshift(echange));
  }

  refreshList() {
    this.echangesServices.getEchangesByMatch(this.matchId).subscribe((coups) => {
      this.listeCoups = coups.sort((a: Echange, b: Echange) => b.id - a.id);
      console.log(coups);
    });
  }

  supprimerCoup(id: number) {
    // TODO debug les relations
    this.echangesServices.supprimerEchange(id).subscribe(() => {
      console.log("C'était ma cape 😎");
      this.refreshList();
    });
  }
}
