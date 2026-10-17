import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreinscritComponent } from './score-inscrit.component';

describe('ScoreinscritComponent', () => {
  let component: ScoreinscritComponent;
  let fixture: ComponentFixture<ScoreinscritComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreinscritComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreinscritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
