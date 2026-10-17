import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscritLigneComponent } from './inscrit-ligne.component';

describe('InscritLigneComponent', () => {
  let component: InscritLigneComponent;
  let fixture: ComponentFixture<InscritLigneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscritLigneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscritLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
