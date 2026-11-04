import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaisieEchangeComponent } from './saisie-echange.component';

describe('SaisieEchangeComponent', () => {
  let component: SaisieEchangeComponent;
  let fixture: ComponentFixture<SaisieEchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaisieEchangeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SaisieEchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
