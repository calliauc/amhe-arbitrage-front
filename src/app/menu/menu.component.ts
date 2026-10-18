import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from '../shared/services/log.service';
import { LoginComponent } from '../login/login.component';
import { RolesNames } from '../shared/models/roles';

@Component({
    selector: 'app-menu',
    imports: [CommonModule, LoginComponent],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  private logService = inject(LogService);
  private router = inject(Router);

  estMenuVisible = false;
  role!: RolesNames;

  ngOnInit(): void {
    this.logService.notificationRole$.subscribe(e => this.role = e)
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
