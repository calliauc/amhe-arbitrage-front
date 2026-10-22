import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditerComponent } from './item-editer.component';

describe('ItemEditerComponent', () => {
  let component: ItemEditerComponent;
  let fixture: ComponentFixture<ItemEditerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemEditerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemEditerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
