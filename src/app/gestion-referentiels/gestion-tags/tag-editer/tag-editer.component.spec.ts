import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagEditerComponent } from './tag-editer.component';

describe('TagEditerComponent', () => {
  let component: TagEditerComponent;
  let fixture: ComponentFixture<TagEditerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagEditerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TagEditerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
