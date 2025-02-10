import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPoulesComponent } from './gestion-poules.component';

describe('AffichagePoulesComponent', () => {
  let component: GestionPoulesComponent;
  let fixture: ComponentFixture<GestionPoulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionPoulesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionPoulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
