import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMatchComponent } from './gestion-match.component';

describe('GestionMatchComponent', () => {
  let component: GestionMatchComponent;
  let fixture: ComponentFixture<GestionMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionMatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
