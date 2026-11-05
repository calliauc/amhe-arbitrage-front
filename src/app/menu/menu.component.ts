import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthV1Service } from '../shared/services/auth-v1.service';
import { LoginComponent } from '../login/login.component';
import { RolesNames } from '../shared/models/roles';
import { MenuMobileService } from '../shared/services/menu-mobile.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-menu',
    imports: [CommonModule, LoginComponent],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  private logService = inject(AuthV1Service);
  private menuMobileService = inject(MenuMobileService);
  private router = inject(Router);

  estMenuVisible = false;
  role!: RolesNames;
  pageActuelle$!:Observable<string>;
  icon='🟰';

  ngOnInit(): void {
    this.logService.notificationRole$.subscribe(e => this.role = e)
    this.pageActuelle$ = this.menuMobileService.pageActuelle$;
  }

  allerVers(page: string) {
    this.estMenuVisible = false;
    this.router.navigate([page]);
  }

  afficherMenu(event: Event) {
    const btn = event.target as HTMLSelectElement;
    this.estMenuVisible = !this.estMenuVisible;
    btn.ariaLabel = (this.estMenuVisible?'Masquer':'Afficher') + ' le menu';
    // this.icon = this.estMenuVisible?'⬆️':'⬇️';
  }

  masquerMenu() {
    this.estMenuVisible = false;
  }
}
