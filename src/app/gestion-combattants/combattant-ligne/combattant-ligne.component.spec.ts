import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombattantLigneComponent } from './combattant-ligne.component';

describe('CombattantLigneComponent', () => {
  let component: CombattantLigneComponent;
  let fixture: ComponentFixture<CombattantLigneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombattantLigneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombattantLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
