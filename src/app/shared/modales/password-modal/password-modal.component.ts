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
import { FormsModule } from '@angular/forms';
import { Secu } from '../../models/secu';
import { RolesNames } from '../../models/roles';

@Component({
    selector: 'app-password-modal',
    imports: [FormsModule],
    templateUrl: './password-modal.component.html',
    styleUrl: './password-modal.component.css'
})
export class PasswordModalComponent implements OnInit, AfterViewInit {
  @Input() code!: string;
  @Output() confirmer = new EventEmitter<RolesNames>();
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
    switch (this.password.secret) {
      case "arbitre":
        this.confirmer.emit("arbitre");
        break;
      case "admin":
        this.confirmer.emit("admin");
        break;
      default:
        alert('Nope');
        break;
    }
  }

  fermerModale(): void {
    this.annuler.emit(true);
  }
}
