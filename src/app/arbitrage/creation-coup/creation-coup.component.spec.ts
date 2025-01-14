import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationCoupComponent } from './creation-coup.component';

describe('CoupComponent', () => {
  let component: CreationCoupComponent;
  let fixture: ComponentFixture<CreationCoupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationCoupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreationCoupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
