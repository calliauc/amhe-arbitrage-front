import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombattantEditerComponent } from './combattant-editer.component';

describe('CombattantEditerComponent', () => {
  let component: CombattantEditerComponent;
  let fixture: ComponentFixture<CombattantEditerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombattantEditerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombattantEditerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
