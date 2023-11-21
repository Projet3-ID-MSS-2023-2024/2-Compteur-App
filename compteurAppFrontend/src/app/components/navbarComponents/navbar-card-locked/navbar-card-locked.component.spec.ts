import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCardLockedComponent } from './navbar-card-locked.component';

describe('NavbarCardLockedComponent', () => {
  let component: NavbarCardLockedComponent;
  let fixture: ComponentFixture<NavbarCardLockedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarCardLockedComponent]
    });
    fixture = TestBed.createComponent(NavbarCardLockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
