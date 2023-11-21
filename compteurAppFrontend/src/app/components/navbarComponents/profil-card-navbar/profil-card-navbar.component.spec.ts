import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilCardNavbarComponent } from './profil-card-navbar.component';

describe('ProfilCardNavbarComponent', () => {
  let component: ProfilCardNavbarComponent;
  let fixture: ComponentFixture<ProfilCardNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilCardNavbarComponent]
    });
    fixture = TestBed.createComponent(ProfilCardNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
