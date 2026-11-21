import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauInscritModalComponent } from './nouveau-inscrit-modal.component';

describe('ConfirmationModalComponent', () => {
  let component: NouveauInscritModalComponent;
  let fixture: ComponentFixture<NouveauInscritModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouveauInscritModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouveauInscritModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
