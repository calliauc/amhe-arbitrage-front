import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuModalComponent } from './secu-modal.component';

describe('ConfirmationModalComponent', () => {
  let component: SecuModalComponent;
  let fixture: ComponentFixture<SecuModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecuModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SecuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
