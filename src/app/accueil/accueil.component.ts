import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-accueil',
    imports: [],
    templateUrl: './accueil.component.html',
    styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit {
  env = environment;
  estLectureSeule= true;

  ngOnInit(): void {
    this.estLectureSeule = localStorage.getItem('secu') !== 'unlocked';
  }
}
