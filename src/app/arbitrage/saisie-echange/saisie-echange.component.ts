import { Component, inject, Input, OnInit } from '@angular/core';
import { Match } from '../../shared/models/match';
import { EchangesService } from '../../shared/services/echanges.service';
import { Echange, EchangeTemp, EchangeTempApi } from '../../shared/models/echange';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Inscrit } from '../../shared/models/inscrit';
import { Item } from '../../shared/models/item';

interface formCoup{
  cible: FormControl<Item | null>;
  vulnerant: FormControl<Item | null>;
}

interface formEchange{
  typeEchange: FormControl<Item|null>;
  attaquant: FormControl<Inscrit | null>;
  coupA: FormGroup<formCoup>;
  coupB: FormGroup<formCoup>;
}

// TODO rendre ce formulaire joli et ergonomique

@Component({
  imports: [ ReactiveFormsModule ],
  selector: 'app-saisie-echange',
  styleUrl: './saisie-echange.component.css',
  templateUrl: './saisie-echange.component.html',
})
export class SaisieEchangeComponent implements OnInit {
  private echangeService = inject(EchangesService);
  @Input() match: Match = new Match;

  echangeTemp: EchangeTemp = new EchangeTemp;
  echangeCreation: EchangeTempApi = new EchangeTempApi;
  formulaireErreur = true;

  toucheSeule = false;
  prio = false;
  simu = false;

  labelAttaquant = "";
  hasCoupDef= false;

  formSaisieEchange: FormGroup<formEchange> = new FormGroup({
    typeEchange: new FormControl<Item>(new Item()),
    attaquant: new FormControl<Inscrit>(new Inscrit()),
    coupA: new FormGroup<formCoup>({
      cible: new FormControl<Item>(new Item()),
      vulnerant: new FormControl<Item>(new Item()),
    }),
    coupB: new FormGroup<formCoup>({
      cible: new FormControl<Item>(new Item()),
      vulnerant: new FormControl<Item>(new Item()),
    })
  });

  ngOnInit(): void {
    this.formSaisieEchange.controls.typeEchange.valueChanges.subscribe(type => this.traiterTypeEchange(type));
    this.formSaisieEchange.controls.attaquant.valueChanges.subscribe(attaquant => this.traiterInscrits(attaquant));
    this.formSaisieEchange.controls.coupA.valueChanges.subscribe(coup => this.traiterCoupA(coup));
  }

  traiterTypeEchange(type: Item|null){
    console.log(type?.code);
    if (type){
      this.toucheSeule = this.hasFlag(type, 'toucheClean');
      this.prio = this.hasFlag(type, 'prio');
      this.simu = this.hasFlag(type, 'simu');
    }
    this.formSaisieEchange.controls.coupA.patchValue({cible: null, vulnerant:null});
    this.formSaisieEchange.controls.coupB.patchValue({cible: null, vulnerant:null});
    this.labelAttaquant = this.changeLabelAttaquant()
    if (this.simu){
      this.formSaisieEchange.controls.attaquant.setValue(this.match.inscritA);
    } else {
      this.formSaisieEchange.controls.attaquant.setValue(new Inscrit());
    }
  }

  traiterInscrits(attaquant: Inscrit|null){
    if (attaquant){
      if(attaquant.id===this.match.inscritA.id){
        this.echangeTemp.inscritA = this.match.inscritA;
        this.echangeTemp.inscritB = this.match.inscritB;
      } else if(attaquant.id===this.match.inscritB.id){
        this.echangeTemp.inscritA = this.match.inscritB;
        this.echangeTemp.inscritB = this.match.inscritA;
      } 
      console.log(this.echangeTemp);
      
    }
  }

  traiterCoupA(coup: Partial<{
    cible: Item | null;
    vulnerant: Item | null;
   }>){
    this.hasCoupDef = !!(coup?.cible?.id && coup?.vulnerant?.id) && !this.toucheSeule;
  }

  hasFlag(item:Item, flagName: string):boolean{
    return !!item?.flags?.find(flag => flag===flagName)
  }

  changeLabelAttaquant(): string{
    if(this.toucheSeule)
      return "Qui frappe ?"
    else if(this.prio){
      return "Qui a la priorité ?"
    } else
      return '';
  }

  onValider() {
    const test = this.formSaisieEchange.value;
    this.echangeCreation.match = this.match.id;
    this.echangeCreation.inscritA = this.echangeTemp.inscritA.id;
    this.echangeCreation.inscritB = this.echangeTemp.inscritB.id;
    this.echangeCreation.scoreA = this.match.scoreA;
    this.echangeCreation.scoreB = this.match.scoreB;    
    this.echangeCreation.type = test.typeEchange!.id;
    this.echangeCreation.vulnerantA = test.coupA!.vulnerant!.id;
    this.echangeCreation.cibleA = test.coupA!.cible!.id;
    this.echangeCreation.vulnerantB = test.coupB?.vulnerant?.id;
    this.echangeCreation.cibleB = test.coupB?.cible?.id;
    console.log(this.echangeCreation);
    this.echangeService
    .creerEchange(this.echangeCreation)
    .subscribe(echange => {
      this.echangeService.notificationEchange.next(echange);
      console.log(echange);
    });
  }
}
