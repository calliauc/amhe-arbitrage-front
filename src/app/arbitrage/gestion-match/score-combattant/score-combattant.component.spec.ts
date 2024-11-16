import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreCombattantComponent } from './score-combattant.component';

describe('ScoreCombattantComponent', () => {
  let component: ScoreCombattantComponent;
  let fixture: ComponentFixture<ScoreCombattantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreCombattantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreCombattantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
