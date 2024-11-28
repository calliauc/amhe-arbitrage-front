import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCombattantsComponent } from './gestion-combattants.component';

describe('GestionCombattantsComponent', () => {
  let component: GestionCombattantsComponent;
  let fixture: ComponentFixture<GestionCombattantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionCombattantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionCombattantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
