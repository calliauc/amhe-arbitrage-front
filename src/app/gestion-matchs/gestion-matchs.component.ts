import { Component, OnInit } from '@angular/core';
import { MatchsService } from '../shared/services/matchs.service';
import { Match } from '../shared/models/match';
import { ClubPipe } from '../shared/pipes/club.pipe';
import { NomsPipe } from '../shared/pipes/noms.pipe';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestion-matchs',
  standalone: true,
  imports: [RouterLink, ClubPipe, NomsPipe],
  templateUrl: './gestion-matchs.component.html',
  styleUrl: './gestion-matchs.component.css',
})
export class GestionMatchsComponent implements OnInit {
  matchs: Match[] = [];
  constructor(private matchsService: MatchsService, private router: Router) {}

  ngOnInit(): void {
    this.matchsService.getMatchs().subscribe((matchs) => {
      this.matchs = matchs;
      console.log(this.matchs);
    });
  }

  creerMatch() {
    this.router.navigate(['creer-match']);
  }
}
