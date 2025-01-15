import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesetAfficherComponent } from './ruleset-afficher.component';

describe('RulesetAfficherComponent', () => {
  let component: RulesetAfficherComponent;
  let fixture: ComponentFixture<RulesetAfficherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulesetAfficherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RulesetAfficherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
