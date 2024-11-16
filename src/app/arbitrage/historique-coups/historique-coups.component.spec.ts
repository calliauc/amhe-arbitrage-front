import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueCoupsComponent } from './historique-coups.component';

describe('HistoriqueCoupsComponent', () => {
  let component: HistoriqueCoupsComponent;
  let fixture: ComponentFixture<HistoriqueCoupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueCoupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueCoupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
