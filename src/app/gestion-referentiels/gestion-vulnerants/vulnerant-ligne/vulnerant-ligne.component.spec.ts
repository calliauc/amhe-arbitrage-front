import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VulnerantLigneComponent } from './vulnerant-ligne.component';

describe('VulnerantLigneComponent', () => {
  let component: VulnerantLigneComponent;
  let fixture: ComponentFixture<VulnerantLigneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VulnerantLigneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VulnerantLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
