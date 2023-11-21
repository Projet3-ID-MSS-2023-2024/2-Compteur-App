import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockNavbarComponent } from './lock-navbar.component';

describe('LockNavbarComponent', () => {
  let component: LockNavbarComponent;
  let fixture: ComponentFixture<LockNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LockNavbarComponent]
    });
    fixture = TestBed.createComponent(LockNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
