import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnnuaireAfficherComponent } from './annuaire-afficher.component';

describe('AnnuaireAfficherComponent', () => {
  let component: AnnuaireAfficherComponent;
  let fixture: ComponentFixture<AnnuaireAfficherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnuaireAfficherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnuaireAfficherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
