import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherCombattantCardComponent } from './afficher-combattant-card.component';

describe('AfficherCombattantCardComponent', () => {
  let component: AfficherCombattantCardComponent;
  let fixture: ComponentFixture<AfficherCombattantCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfficherCombattantCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherCombattantCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
