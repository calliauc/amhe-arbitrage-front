import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagLigneComponent } from './tag-ligne.component';

describe('TagLigneComponent', () => {
  let component: TagLigneComponent;
  let fixture: ComponentFixture<TagLigneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagLigneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TagLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
