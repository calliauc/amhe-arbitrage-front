import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Match } from '../shared/models/match';
import { MatchsService } from '../shared/services/matchs.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CombattantsService } from '../shared/services/combattants.service';
import { Combattant } from '../shared/models/combattant';
import { NomsPipe } from '../shared/pipes/noms.pipe';
import { NouveauMatch } from '../shared/models/nouveau-match';

@Component({
  selector: 'app-creation-match',
  standalone: true,
  imports: [ReactiveFormsModule, NomsPipe],
  templateUrl: './creation-match.component.html',
  styleUrl: './creation-match.component.css',
})
export class CreationMatchComponent implements OnInit {
  formCreerMatch!: FormGroup;
  combattantsListe!: Combattant[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private matchsService: MatchsService,
    private combattantsService: CombattantsService
  ) {}

  ngOnInit(): void {
    this.combattantsService.getCombattants().subscribe((liste) => {
      this.combattantsListe = liste;
    });
    this.formCreerMatch = this.formBuilder.group({
      combattantBleu: null,
      combattantRouge: null,
    });
  }

  creerMatch() {
    console.log(this.formCreerMatch.value);
    let nouveauMatch = new NouveauMatch(
      this.formCreerMatch.value.combattantBleu,
      this.formCreerMatch.value.combattantRouge
    );
    console.log(nouveauMatch);
    this.matchsService
      .creerMatch(nouveauMatch)
      .subscribe((matchCree: Match) =>
        this.router.navigate(['arbitrage', matchCree.id])
      );
  }

  ruleset() {
    /**
     * Pré-remplit les scores, timer, arme et autre
     * selon le ruleset sélectionné
     *
     * Par exemple pour l'épée longue :
     *  les scores à 6 et timer croisant à 0
     */
  }
}
