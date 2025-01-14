import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubEditerComponent } from './club-editer.component';

describe('ClubEditerComponent', () => {
  let component: ClubEditerComponent;
  let fixture: ComponentFixture<ClubEditerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubEditerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClubEditerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
