import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombattantAfficherComponent } from './combattant-afficher.component';

describe('CombattantAfficherComponent', () => {
  let component: CombattantAfficherComponent;
  let fixture: ComponentFixture<CombattantAfficherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombattantAfficherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombattantAfficherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
