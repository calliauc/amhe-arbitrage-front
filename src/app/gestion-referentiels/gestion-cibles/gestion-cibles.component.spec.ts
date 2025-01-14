import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCiblesComponent } from './gestion-cibles.component';

describe('GestionCiblesComponent', () => {
  let component: GestionCiblesComponent;
  let fixture: ComponentFixture<GestionCiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionCiblesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionCiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
