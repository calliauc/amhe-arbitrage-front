import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementOverviewComponent } from './evenement-overview.component';

describe('EvenementComponent', () => {
  let component: EvenementOverviewComponent;
  let fixture: ComponentFixture<EvenementOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvenementOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvenementOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
