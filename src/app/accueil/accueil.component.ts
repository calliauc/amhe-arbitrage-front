import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css',
})
export class AccueilComponent {
  env = environment;
}
