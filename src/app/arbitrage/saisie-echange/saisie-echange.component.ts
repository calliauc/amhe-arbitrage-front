import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { EchangeNouveau, EchangeNouveauInterface, echangeNouveauVide } from '../../shared/models/echange-nouveau';
import { Match } from '../../shared/models/match';
import { EchangesService } from '../../shared/services/echanges.service';
import { Echange } from '../../shared/models/echange';

@Component({
  imports: [],
  selector: 'app-saisie-echange',
  styleUrl: './saisie-echange.component.css',
  templateUrl: './saisie-echange.component.html',
})
export class SaisieEchangeComponent implements OnInit {
private echangeService = inject(EchangesService);
@Input() match: Match = new Match;

echangeNouveau: EchangeNouveau = new EchangeNouveau;
formulaireErreur = true;
toucheClean = true;
echanges:Echange[] = [];

constructor(){ 
  this.echangeNouveau.match = this.match.id;
}

ngOnInit(): void {
  this.echangeService.getEchangesByMatch(this.match.id).subscribe(echanges => this.echanges = [...this.echanges]);
}

onSelectAttaquant(event: Event) {
  const attaquant = event.target as HTMLSelectElement;
  const id = Number(attaquant.id);
}

onSelectItem(event: Event, type: string) {
    const item = event.target as HTMLSelectElement;
    const itemId = Number(item.value);
    console.log(type);
    
    if (type === 'attaquant'){
      if (itemId === this.match.inscritA.id){
        this.echangeNouveau.inscritA = this.match.inscritA.id;
        this.echangeNouveau.inscritB = this.match.inscritB.id;
        this.echangeNouveau.scoreA = this.match.scoreA;
        this.echangeNouveau.scoreB = this.match.scoreB;
      } else if (itemId === this.match.inscritB.id){
        this.echangeNouveau.inscritB = this.match.inscritA.id;
        this.echangeNouveau.inscritA = this.match.inscritB.id;
        this.echangeNouveau.scoreA = this.match.scoreB;
        this.echangeNouveau.scoreB = this.match.scoreA;
      }
    } else if (type === 'type'){
        this.echangeNouveau.type = itemId;
        this.traiterTypeEchange();
    } else if (type === 'vulnerant_a'){
      this.echangeNouveau.vulnerantA = itemId;
    } else if (type === 'cible_a') {
      this.echangeNouveau.cibleA = itemId;
    } else if (type === 'vulnerant_b'){
      this.echangeNouveau.vulnerantB = itemId;
    } else if (type === 'cible_b'){
      this.echangeNouveau.cibleB = itemId;
    } else {
        console.log("Type d'item inconnu : ", type);            
    }
  }

  traiterTypeEchange(){
    this.toucheClean = this.echangeNouveau.type === 21 ? true : false;
  }

  onValider() {
    this.echangeNouveau.match = this.match.id;
    console.log(this.echangeNouveau);
    this.echangeService
    .creerEchange(this.echangeNouveau)
    .subscribe(echange => {
      this.echanges.push(echange)
      console.log(this.echanges);
      
    });
  }
}
