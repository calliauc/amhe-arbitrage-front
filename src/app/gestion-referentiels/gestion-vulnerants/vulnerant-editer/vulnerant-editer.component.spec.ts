import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VulnerantEditerComponent } from './vulnerant-editer.component';

describe('VulnerantEditerComponent', () => {
  let component: VulnerantEditerComponent;
  let fixture: ComponentFixture<VulnerantEditerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VulnerantEditerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VulnerantEditerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
