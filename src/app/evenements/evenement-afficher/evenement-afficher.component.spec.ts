import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscritAfficherComponent } from './inscrit-afficher.component';

describe('InscritAfficherComponent', () => {
  let component: InscritAfficherComponent;
  let fixture: ComponentFixture<InscritAfficherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscritAfficherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscritAfficherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
