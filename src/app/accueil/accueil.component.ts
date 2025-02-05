import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { couleurs, RulesetRef } from '../shared/models/ruleset-ref';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css',
})
export class AccueilComponent implements OnInit {
  env = environment;
  couleur = RulesetRef.getCodeByLibelle(couleurs, 'bleu');
  date = new Date();

  ngOnInit(): void {
    console.log(RulesetRef.getCodeByLibelle(couleurs, 'bleu'));
    console.log(new Date());
  }
}
