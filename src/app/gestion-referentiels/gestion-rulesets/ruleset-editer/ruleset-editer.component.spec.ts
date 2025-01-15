import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesetEditerComponent } from './ruleset-editer.component';

describe('RulesetEditerComponent', () => {
  let component: RulesetEditerComponent;
  let fixture: ComponentFixture<RulesetEditerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulesetEditerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RulesetEditerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
