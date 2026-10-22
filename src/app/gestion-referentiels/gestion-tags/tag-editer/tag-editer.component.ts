import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ConfirmationModalComponent } from '../../../shared/modales/confirmation-modal/confirmation-modal.component';
import { Item } from '../../../shared/models/item';

@Component({
    selector: 'app-tag-editer',
    imports: [ReactiveFormsModule, NgClass, ConfirmationModalComponent],
    templateUrl: './tag-editer.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './tag-editer.component.css'
})
export class TagEditerComponent implements OnInit, AfterViewInit {
  private formBuilder = inject(FormBuilder);
  // private itemsService = inject(ItemsService);

  @Input() tag: Item = new Item();
  @Input() estPair!: boolean;
  @Input() estModeEdition = false;
  @Output() annulerEditionCreation = new EventEmitter<boolean>();
  @Output() supprimerTag = new EventEmitter<number>();
  @Output() validerEdition = new EventEmitter<Item>();
  @Output() validerCreation = new EventEmitter<Item>();
  @ViewChild('focus') focusForm!: ElementRef;

  itemsListe!: Item[];
  ereurSaisie: boolean;
  estModalVisible = false;
  titreModal = 'Confirmer la suppression ?';
  texteModal = 'Cette action est définitive';
  formEditerItem!: FormGroup;

  constructor() {
    this.ereurSaisie = false;
  }

  ngOnInit(): void {
    this.formEditerItem = this.formBuilder.group({
      id: this.tag.id,
      code: this.tag.code,
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

  confirmerSuppression(code: string | number) {
    this.estModalVisible = false;
    this.supprimerTag.emit(code as number);
  }

  annulerSuppression() {
    this.estModalVisible = false;
  }

  confirmer(): void {
    this.ereurSaisie = false;
    this.tag = this.formEditerItem.value;
    if (this.verifierTag(this.tag)) {
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
      // this.itemsService.modifierItem(this.item).subscribe((result) => {
      //   this.validerEdition.emit(result);
      // });
    } else {
      // this.itemsService.creerItem(this.item).subscribe((itemCree) => {
      //   this.validerCreation.emit(itemCree);
      // });
    }
  }

  verifierTag(tag: Item): boolean {
    return !!tag.code;
  }
}
