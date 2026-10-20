import { Component, EventEmitter, Input, OnInit, Output, inject, ChangeDetectionStrategy } from '@angular/core';
import { Inscrit } from '../../shared/models/inscrit';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { RolesNames } from '../../shared/models/roles';
import { AuthV1Service } from '../../shared/services/auth-v1.service';

@Component({
    selector: 'app-inscrit-afficher',
    imports: [NgClass],
    templateUrl: './inscrit-afficher.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './inscrit-afficher.component.css'
})
export class InscritAfficherComponent implements OnInit {
  private router = inject(Router);
  private Auth = AuthV1Service;

  @Input() inscrit!: Inscrit;
  @Input() estPair!: boolean;
  @Input() role!: RolesNames;
  @Output() editerInscrit = new EventEmitter<boolean>();

  ngOnInit(): void {
    if (this.estPair) return;
    else return;
  }

  editer() {
    this.editerInscrit.emit();
  }

  onDetails(id: number) {
    this.router.navigate(['inscrit', id]);
  }
}
