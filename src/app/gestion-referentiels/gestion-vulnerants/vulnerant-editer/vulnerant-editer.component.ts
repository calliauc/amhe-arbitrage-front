import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ConfirmationModalComponent } from '../../../shared/modales/confirmation-modal/confirmation-modal.component';
import { Item } from '../../../shared/models/item';
import { ItemsService } from '../../../shared/services/items.service';

@Component({
    selector: 'app-vulnerant-editer',
    imports: [ReactiveFormsModule, NgClass, ConfirmationModalComponent],
    templateUrl: './vulnerant-editer.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './vulnerant-editer.component.css'
})
export class VulnerantEditerComponent implements OnInit, AfterViewInit {
  private formBuilder = inject(FormBuilder);
  private itemsService = inject(ItemsService);

  @Input() vulnerant: Item = new Item();
  @Input() estPair!: boolean;
  @Input() estModeEdition = false;
  @Output() annulerEditionCreation = new EventEmitter<boolean>();
  @Output() supprimerVulnerant = new EventEmitter<number>();
  @Output() validerEdition = new EventEmitter<Item>();
  @Output() validerCreation = new EventEmitter<Item>();
  @ViewChild('focus') focusForm!: ElementRef;

  vulnerantsListe!: Item[];
  ereurSaisie: boolean;
  estModalVisible = false;
  titreModal = 'Confirmer la suppression ?';
  texteModal = 'Cette action est définitive';
  formEditerVulnerant!: FormGroup;

  constructor() {
    this.ereurSaisie = false;
  }

  ngOnInit(): void {
    this.formEditerVulnerant = this.formBuilder.group({
      code: this.vulnerant.code,
      libelle: this.vulnerant.libelle,
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

  confirmerSuppression(id: number) {
    this.estModalVisible = false;
    this.supprimerVulnerant.emit(id);
  }

  annulerSuppression() {
    this.estModalVisible = false;
  }

  confirmer(): void {
    this.ereurSaisie = false;
    this.vulnerant = this.formEditerVulnerant.value;
    if (this.verifierVulnerant(this.vulnerant)) {
      this.enregistrer();
    } else {
      this.ereurSaisie = true;
      setTimeout(() => {
        this.ereurSaisie = false;
      }, 3000);
    }
  }

  enregistrer() {
    if (this.estModeEdition) {
      this.itemsService
        .modifierItem(this.vulnerant)
        .subscribe((result) => {
          this.validerEdition.emit(result);
        });
    } else {
      this.itemsService
        .creerItem(this.vulnerant)
        .subscribe((vulnerantCree) => {
          this.validerCreation.emit(vulnerantCree);
        });
    }
  }

  verifierVulnerant(vulnerant: Item): boolean {
    return !!vulnerant.code && !!vulnerant.libelle;
  }
}
