import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubAfficherComponent } from './club-afficher.component';

describe('ClubAfficherComponent', () => {
  let component: ClubAfficherComponent;
  let fixture: ComponentFixture<ClubAfficherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubAfficherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClubAfficherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
