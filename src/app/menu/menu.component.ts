import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  estMenuVisible: boolean = false;
  estLectureSeule: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.estLectureSeule = localStorage.getItem('secu') !== 'unlocked';
  }

  allerVers(page: String) {
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
