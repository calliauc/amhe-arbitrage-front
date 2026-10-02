import { Component, EventEmitter, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { SecuModalComponent } from '../shared/modales/secu-modal/secu-modal.component';

@Component({
    selector: 'app-login',
    imports: [SecuModalComponent],
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  estLectureSeule = true;
  estModateSecuVisible = false;
  @Output() loginEvent = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.estLectureSeule = localStorage.getItem('secu') !== 'unlocked';
    this.loginEvent.emit(this.estLectureSeule);
  }
  ouvrirSecu() {
    this.estModateSecuVisible = true;
  }

  deverouiller() {
    this.estLectureSeule = false;
    this.estModateSecuVisible = false;
    localStorage.setItem('secu', 'unlocked');
    this.loginEvent.emit(this.estLectureSeule);
  }
  annuler() {
    this.estModateSecuVisible = false;
  }

  stopModif() {
    this.estLectureSeule = true;
    localStorage.clear();
    this.loginEvent.emit(this.estLectureSeule);
  }
}
