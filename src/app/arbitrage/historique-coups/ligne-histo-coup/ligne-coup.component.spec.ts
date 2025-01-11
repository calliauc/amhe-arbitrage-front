import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneCoupComponent } from './ligne-coup.component';

describe('LigneHistoCoupComponent', () => {
  let component: LigneCoupComponent;
  let fixture: ComponentFixture<LigneCoupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigneCoupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LigneCoupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
