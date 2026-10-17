import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherInscritCardComponent } from './afficher-inscrit-card.component';

describe('AfficherInscritCardComponent', () => {
  let component: AfficherInscritCardComponent;
  let fixture: ComponentFixture<AfficherInscritCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfficherInscritCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherInscritCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
