import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubLigneComponent } from './club-ligne.component';

describe('ClubLigneComponent', () => {
  let component: ClubLigneComponent;
  let fixture: ComponentFixture<ClubLigneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubLigneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClubLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
