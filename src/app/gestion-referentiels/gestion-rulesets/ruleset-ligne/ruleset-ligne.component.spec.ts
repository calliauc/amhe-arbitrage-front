import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesetLigneComponent } from './ruleset-ligne.component';

describe('RulesetLigneComponent', () => {
  let component: RulesetLigneComponent;
  let fixture: ComponentFixture<RulesetLigneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulesetLigneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RulesetLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
