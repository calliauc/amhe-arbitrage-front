import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichagePouleComponent } from './affichage-poule.component';

describe('AffichagePouleComponent', () => {
  let component: AffichagePouleComponent;
  let fixture: ComponentFixture<AffichagePouleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichagePouleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffichagePouleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
