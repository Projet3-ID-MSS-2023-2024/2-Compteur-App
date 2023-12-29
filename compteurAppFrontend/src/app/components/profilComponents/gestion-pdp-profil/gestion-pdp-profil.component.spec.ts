import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPdpProfilComponent } from './gestion-pdp-profil.component';

describe('GestionPdpProfilComponent', () => {
  let component: GestionPdpProfilComponent;
  let fixture: ComponentFixture<GestionPdpProfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionPdpProfilComponent]
    });
    fixture = TestBed.createComponent(GestionPdpProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
