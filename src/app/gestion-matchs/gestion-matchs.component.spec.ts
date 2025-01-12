import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMatchsComponent } from './gestion-matchs.component';

describe('GestionMatchsComponent', () => {
  let component: GestionMatchsComponent;
  let fixture: ComponentFixture<GestionMatchsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionMatchsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionMatchsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
