import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichagePoulesComponent } from './affichage-poules.component';

describe('AffichagePoulesComponent', () => {
  let component: AffichagePoulesComponent;
  let fixture: ComponentFixture<AffichagePoulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichagePoulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffichagePoulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
