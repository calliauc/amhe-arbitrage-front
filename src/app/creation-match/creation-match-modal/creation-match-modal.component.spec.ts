import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationMatchModalComponent } from './creation-match-modal.component';

describe('ConfirmationModalComponent', () => {
  let component: CreationMatchModalComponent;
  let fixture: ComponentFixture<CreationMatchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationMatchModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreationMatchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
