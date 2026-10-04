import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from '../shared/services/log.service';
import { LoginComponent } from '../login/login.component';

@Component({
    selector: 'app-menu',
    imports: [CommonModule, LoginComponent],
    templateUrl: './menu.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  private logService = inject(LogService);
  private router = inject(Router);

  estMenuVisible = false;
  estLog = false;

  ngOnInit(): void {
    this.logService.notification$.subscribe(e => this.estLog = e)
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
