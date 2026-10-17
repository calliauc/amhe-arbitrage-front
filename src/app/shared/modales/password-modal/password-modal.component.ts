import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ChangeDetectionStrategy,
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
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  password!: Secu;

  ngOnInit(): void {
    this.password = {
      code: this.code,
    } as Secu;
  }

  ngAfterViewInit(): void {
    this.passwordInput.nativeElement.focus();
  }

  verifierPassword() {
    if (this.password.secret === 'secret') this.confirmer.emit(this.password);
    else alert('Nope');
  }

  fermerModale(): void {
    this.annuler.emit(true);
  }
}
