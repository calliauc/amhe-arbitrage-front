import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Combattant } from '../shared/models/combattant';
import { CombattantsService } from '../shared/services/combattants.service';

@Component({
    selector: 'app-accueil',
    imports: [ReactiveFormsModule],
    templateUrl: './accueil.component.html',
    styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private combattantsService = inject(CombattantsService);

  env = environment;
  estLectureSeule= true;
  combattants = [] as Combattant[];

  combattantForm = this.formBuilder.group({
    combattant: ['', Validators.required]
  });

  ngOnInit(): void {
    this.estLectureSeule = localStorage.getItem('secu') !== 'unlocked';
  }

  constructor(){
    this.combattantsService.getCombattants().subscribe(results => this.combattants = results);

    this.combattantForm.controls.combattant.valueChanges.subscribe((change) => {
      if (this.combattantForm.controls.combattant.status){
        this.combattantsService
        .getCombattantByName(change as string)
        .subscribe(results => this.combattants = results);
      } else {
        this.combattantsService.getCombattants().subscribe(results => this.combattants = results);
      }
    })
  }
}
