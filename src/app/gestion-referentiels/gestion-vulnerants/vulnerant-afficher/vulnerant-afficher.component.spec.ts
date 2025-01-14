import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VulnerantAfficherComponent } from './vulnerant-afficher.component';

describe('VulnerantAfficherComponent', () => {
  let component: VulnerantAfficherComponent;
  let fixture: ComponentFixture<VulnerantAfficherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VulnerantAfficherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VulnerantAfficherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
