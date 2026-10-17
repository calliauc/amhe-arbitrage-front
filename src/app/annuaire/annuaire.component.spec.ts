import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionIndividusComponent } from './gestion-individus.component';

describe('GestionIndividusComponent', () => {
  let component: GestionIndividusComponent;
  let fixture: ComponentFixture<GestionIndividusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionIndividusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionIndividusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
