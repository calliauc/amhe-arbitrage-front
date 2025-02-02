import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchAfficherComponent } from './match-afficher.component';

describe('MatchAfficherComponent', () => {
  let component: MatchAfficherComponent;
  let fixture: ComponentFixture<MatchAfficherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchAfficherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchAfficherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
