import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    imports: [CommonModule],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  private router = inject(Router);

  estMenuVisible = false;
  estLectureSeule = true;

  ngOnInit(): void {
    this.estLectureSeule = localStorage.getItem('secu') !== 'unlocked';
  }

  allerVers(page: string) {
    this.estMenuVisible = false;
    this.router.navigate([page]);
  }

  afficherMenu() {
    this.estMenuVisible = true;
  }

  masquerMenu() {
    this.estMenuVisible = false;
  }
}
