import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoupLongswordComponent } from './coup-longsword.component';

describe('CoupLongswordComponent', () => {
  let component: CoupLongswordComponent;
  let fixture: ComponentFixture<CoupLongswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoupLongswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoupLongswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
