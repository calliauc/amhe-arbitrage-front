import { Component, EventEmitter, Input, OnInit, Output, inject, ChangeDetectionStrategy } from '@angular/core';
import { Individu } from '../../shared/models/individu';
import { NgClass } from '@angular/common';
import { ClubPipe } from '../../shared/pipes/club.pipe';
import { Router } from '@angular/router';

@Component({
    selector: 'app-annuaire-afficher',
    imports: [NgClass, ClubPipe],
    templateUrl: './annuaire-afficher.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './annuaire-afficher.component.css'
})
export class AnnuaireAfficherComponent implements OnInit {
  private router = inject(Router);

  @Input() individu!: Individu;
  @Input() estPair!: boolean;
  @Input() estLog!: boolean;
  @Output() editerIndividu = new EventEmitter<boolean>();

  ngOnInit(): void {
    if (this.estPair) return;
    else return;
  }

  editer() {
    this.editerIndividu.emit();
  }

  onDetails(id: number) {
    this.router.navigate(['individu', id]);
  }
}
