import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagAfficherComponent } from './tag-afficher.component';

describe('TagAfficherComponent', () => {
  let component: TagAfficherComponent;
  let fixture: ComponentFixture<TagAfficherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagAfficherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TagAfficherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
