import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CibleLigneComponent } from './cible-ligne.component';

describe('CibleLigneComponent', () => {
  let component: CibleLigneComponent;
  let fixture: ComponentFixture<CibleLigneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CibleLigneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CibleLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
