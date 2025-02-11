import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombattantDetailsComponent } from './combattant-details.component';

describe('CombattantDetailsComponent', () => {
  let component: CombattantDetailsComponent;
  let fixture: ComponentFixture<CombattantDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombattantDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombattantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
