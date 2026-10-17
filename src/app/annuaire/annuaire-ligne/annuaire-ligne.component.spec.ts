import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividuLigneComponent } from './individu-ligne.component';

describe('IndividuLigneComponent', () => {
  let component: IndividuLigneComponent;
  let fixture: ComponentFixture<IndividuLigneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividuLigneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividuLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
