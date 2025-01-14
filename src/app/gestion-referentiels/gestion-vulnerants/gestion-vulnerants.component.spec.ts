import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionVulnerantsComponent } from './gestion-vulnerants.component';

describe('GestionVulnerantsComponent', () => {
  let component: GestionVulnerantsComponent;
  let fixture: ComponentFixture<GestionVulnerantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionVulnerantsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionVulnerantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
