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

@Component({
  selector: 'app-secu-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './secu-modal.component.html',
  styleUrl: './secu-modal.component.css',
})
export class SecuModalComponent implements OnInit, AfterViewInit {
  @Input() code!: String;
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

  confirmerSecret() {
    this.confirmer.emit(this.secu);
  }
  annulerSecret(): void {
    this.annuler.emit(true);
  }
}
