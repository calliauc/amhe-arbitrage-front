import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscritEditerComponent } from './inscrit-editer.component';

describe('InscritEditerComponent', () => {
  let component: InscritEditerComponent;
  let fixture: ComponentFixture<InscritEditerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscritEditerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscritEditerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
