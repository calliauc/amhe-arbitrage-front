import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../environments/environment';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Combattant } from '../shared/models/combattant';
import { CombattantsService } from '../shared/services/combattants.service';
import { NguiAutoCompleteDirective, NguiAutoCompleteSelection } from '@ngui/auto-complete';

@Component({
    selector: 'app-accueil',
    imports: [ReactiveFormsModule, NguiAutoCompleteDirective],
    templateUrl: './accueil.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private combattantsService = inject(CombattantsService);

  env = environment;
  estLectureSeule= true;
  combattants = [] as Combattant[];
  selected: Combattant = {} as Combattant;
 
  combattantCompleteForm = this.formBuilder.group({
    combattantComplete: ['', Validators.required]
  });
  
  ngOnInit(): void {
    this.estLectureSeule = localStorage.getItem('secu') !== 'unlocked';
  }
  
  constructor(){
    this.combattantsService.getCombattants().subscribe(results => this.combattants = results);
  }

  formatName(item: Combattant): string {
    return `${item.prenom} ${item.nom} (${item.club?.nomCourt})`;
  }

  onPick(e: NguiAutoCompleteSelection<Combattant>) { 
    this.selected = e.item;
  }

}
