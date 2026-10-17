import { ComponentFixture, TestBed } from '@angular/core/testing';

import { inscritComponent } from './inscrit.component';

describe('inscritComponent', () => {
  let component: inscritComponent;
  let fixture: ComponentFixture<inscritComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [inscritComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(inscritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
