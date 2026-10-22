import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAfficherComponent } from './item-afficher.component';

describe('ItemAfficherComponent', () => {
  let component: ItemAfficherComponent;
  let fixture: ComponentFixture<ItemAfficherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemAfficherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemAfficherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
