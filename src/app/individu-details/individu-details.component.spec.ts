import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndividuDetailsComponent } from './individu-details.component';

describe('IndividuDetailsComponent', () => {
  let component: IndividuDetailsComponent;
  let fixture: ComponentFixture<IndividuDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividuDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IndividuDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
