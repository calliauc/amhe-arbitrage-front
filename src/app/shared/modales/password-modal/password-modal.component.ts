import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Secu } from '../../models/secu';

@Component({
    selector: 'app-password-modal',
    imports: [FormsModule],
    templateUrl: './password-modal.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './password-modal.component.css'
})
export class PasswordModalComponent implements OnInit, AfterViewInit {
  @Input() code!: string;
  @Output() confirmer = new EventEmitter<Secu>();
  @Output() annuler = new EventEmitter<boolean>();
  @ViewChild('secret') secretFocus!: ElementRef;

  secu!: Secu;

  ngOnInit(): void {
    this.secu = {
      code: this.code,
    } as Secu;
  }

  ngAfterViewInit(): void {
    this.secretFocus.nativeElement.focus();
  }

  verifierPassword() {
    if (this.secu.secret === 'secret') this.confirmer.emit(this.secu);
    else alert('Nope');
  }
  fermerModale(): void {
    this.annuler.emit(true);
  }
}
