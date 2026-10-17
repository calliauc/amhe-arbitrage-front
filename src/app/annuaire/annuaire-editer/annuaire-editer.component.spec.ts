import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividuEditerComponent } from './individu-editer.component';

describe('IndividuEditerComponent', () => {
  let component: IndividuEditerComponent;
  let fixture: ComponentFixture<IndividuEditerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividuEditerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividuEditerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
