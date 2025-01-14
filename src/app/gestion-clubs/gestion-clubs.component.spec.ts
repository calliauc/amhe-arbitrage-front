import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionClubsComponent } from './gestion-clubs.component';

describe('GestionClubsComponent', () => {
  let component: GestionClubsComponent;
  let fixture: ComponentFixture<GestionClubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionClubsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
