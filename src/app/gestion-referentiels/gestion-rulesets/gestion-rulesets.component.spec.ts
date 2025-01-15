import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRulesetsComponent } from './gestion-rulesets.component';

describe('GestionRulesetsComponent', () => {
  let component: GestionRulesetsComponent;
  let fixture: ComponentFixture<GestionRulesetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionRulesetsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionRulesetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
