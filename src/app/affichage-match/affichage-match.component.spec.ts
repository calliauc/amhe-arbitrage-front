import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageMatchComponent } from './affichage-match.component';

describe('AffichageMatchComponent', () => {
  let component: AffichageMatchComponent;
  let fixture: ComponentFixture<AffichageMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichageMatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffichageMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
