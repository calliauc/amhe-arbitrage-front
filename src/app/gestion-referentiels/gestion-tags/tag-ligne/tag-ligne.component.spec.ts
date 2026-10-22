import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLigneComponent } from './item-ligne.component';

describe('ItemLigneComponent', () => {
  let component: ItemLigneComponent;
  let fixture: ComponentFixture<ItemLigneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemLigneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
