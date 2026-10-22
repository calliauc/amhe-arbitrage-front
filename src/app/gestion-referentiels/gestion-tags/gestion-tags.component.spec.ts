import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionItemsComponent } from './gestion-items.component';

describe('GestionItemsComponent', () => {
  let component: GestionItemsComponent;
  let fixture: ComponentFixture<GestionItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionItemsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
