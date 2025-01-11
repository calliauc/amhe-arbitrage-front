import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombattantComponent } from './combattant.component';

describe('CombattantComponent', () => {
  let component: CombattantComponent;
  let fixture: ComponentFixture<CombattantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombattantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombattantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
