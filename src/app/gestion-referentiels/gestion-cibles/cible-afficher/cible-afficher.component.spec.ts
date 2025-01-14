import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CibleAfficherComponent } from './cible-afficher.component';

describe('CibleAfficherComponent', () => {
  let component: CibleAfficherComponent;
  let fixture: ComponentFixture<CibleAfficherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CibleAfficherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CibleAfficherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
