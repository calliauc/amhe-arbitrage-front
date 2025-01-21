import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Club } from '../../shared/models/club';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ClubsService } from '../../shared/services/clubs.service';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-club-editer',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, ConfirmationModalComponent],
  templateUrl: './club-editer.component.html',
  styleUrl: './club-editer.component.css',
})
export class ClubEditerComponent implements OnInit, AfterViewInit {
  @Input() club: Club = new Club();
  @Input() estPair!: boolean;
  @Output() annulerEditionCreation: EventEmitter<boolean> = new EventEmitter();
  @Output() supprimerClub: EventEmitter<number> = new EventEmitter();
  @Output() validerEdition: EventEmitter<Club> = new EventEmitter();
  @Output() validerCreation: EventEmitter<Club> = new EventEmitter();
  @ViewChild('focus') focusForm!: ElementRef;

  clubsListe!: Club[];
  ereurSaisie: boolean;
  estModalVisible: boolean = false;
  titreModal: string = 'Confirmer la suppression ?';
  texteModal: string = 'Cette action est définitive';
  formEditerClub!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private clubsService: ClubsService
  ) {
    this.ereurSaisie = false;
  }

  ngOnInit(): void {
    this.formEditerClub = this.formBuilder.group({
      id: this.club.id,
      ville: this.club.ville,
      nomCourt: this.club.nomCourt,
      nomComplet: this.club.nomComplet,
    });
  }

  ngAfterViewInit(): void {
    this.focusForm.nativeElement.focus();
  }

  annuler(): void {
    this.annulerEditionCreation.emit(true);
  }

  demanderSuppression(): void {
    this.estModalVisible = true;
  }

  confirmerSuppression(id: number | string) {
    this.estModalVisible = false;
    this.supprimerClub.emit(id as number);
  }

  annulerSuppression() {
    this.estModalVisible = false;
  }

  confirmer(): void {
    this.ereurSaisie = false;
    this.club = this.formEditerClub.value;
    if (this.verifierClub(this.club)) {
      this.enregistrer();
    } else {
      this.ereurSaisie = true;
      setTimeout(() => {
        this.ereurSaisie = false;
      }, 3000);
    }
  }

  enregistrer() {
    if (this.club.id) {
      this.clubsService.modifierClub(this.club).subscribe((result) => {
        this.validerEdition.emit(result);
      });
    } else {
      this.clubsService.creerClub(this.club).subscribe((clubCree) => {
        this.validerCreation.emit(clubCree);
      });
    }
  }

  verifierClub(club: Club): boolean {
    return !!club.ville && !!club.nomCourt && !!club.nomComplet;
  }
}
