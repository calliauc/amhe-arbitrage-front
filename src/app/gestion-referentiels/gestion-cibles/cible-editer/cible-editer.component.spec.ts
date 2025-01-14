import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CibleEditerComponent } from './cible-editer.component';

describe('CibleEditerComponent', () => {
  let component: CibleEditerComponent;
  let fixture: ComponentFixture<CibleEditerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CibleEditerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CibleEditerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
