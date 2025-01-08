import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationMatchComponent } from './creation-match.component';

describe('CreationMatchComponent', () => {
  let component: CreationMatchComponent;
  let fixture: ComponentFixture<CreationMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationMatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
