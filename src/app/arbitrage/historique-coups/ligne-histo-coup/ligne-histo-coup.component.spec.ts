import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneHistoCoupComponent } from './ligne-histo-coup.component';

describe('LigneHistoCoupComponent', () => {
  let component: LigneHistoCoupComponent;
  let fixture: ComponentFixture<LigneHistoCoupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigneHistoCoupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LigneHistoCoupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
