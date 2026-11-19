import { Component, inject, OnInit } from '@angular/core';
import { IndividuService } from '../shared/services/individus.service';
import { Individu } from '../shared/models/individu';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [AsyncPipe],
  selector: 'app-individu-details',
  styleUrl: './individu-details.component.css',
  templateUrl: './individu-details.component.html',
})
export class IndividuDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private individuService = inject(IndividuService);

  individu$?: Observable<Individu>;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = Number(params["id"]);
      if (!!id){
        this.individu$ = this.individuService.getIndividuById(id);
      }
    }) 

  }
}
