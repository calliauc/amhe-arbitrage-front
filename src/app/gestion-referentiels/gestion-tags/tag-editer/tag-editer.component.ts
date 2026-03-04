import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ConfirmationModalComponent } from '../../../shared/modales/confirmation-modal/confirmation-modal.component';
import { TagsService } from '../../../shared/services/tags.service';
import { Tag } from '../../../shared/models/tag';

@Component({
    selector: 'app-tag-editer',
    imports: [ReactiveFormsModule, NgClass, ConfirmationModalComponent],
    templateUrl: './tag-editer.component.html',
    styleUrl: './tag-editer.component.css'
})
export class TagEditerComponent implements OnInit, AfterViewInit {
  private formBuilder = inject(FormBuilder);
  private tagsService = inject(TagsService);

  @Input() tag: Tag = new Tag();
  @Input() estPair!: boolean;
  @Input() estModeEdition = false;
  @Output() annulerEditionCreation = new EventEmitter<boolean>();
  @Output() supprimerTag = new EventEmitter<number>();
  @Output() validerEdition = new EventEmitter<Tag>();
  @Output() validerCreation = new EventEmitter<Tag>();
  @ViewChild('focus') focusForm!: ElementRef;

  tagsListe!: Tag[];
  ereurSaisie: boolean;
  estModalVisible = false;
  titreModal = 'Confirmer la suppression ?';
  texteModal = 'Cette action est définitive';
  formEditerTag!: FormGroup;

  constructor() {
    this.ereurSaisie = false;
  }

  ngOnInit(): void {
    this.formEditerTag = this.formBuilder.group({
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
    this.tag = this.formEditerTag.value;
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
      this.tagsService.modifierTag(this.tag).subscribe((result) => {
        this.validerEdition.emit(result);
      });
    } else {
      this.tagsService.creerTag(this.tag).subscribe((tagCree) => {
        this.validerCreation.emit(tagCree);
      });
    }
  }

  verifierTag(tag: Tag): boolean {
    return !!tag.code;
  }
}
