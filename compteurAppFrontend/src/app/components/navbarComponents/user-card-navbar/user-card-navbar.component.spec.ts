import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardNavbarComponent } from './user-card-navbar.component';

describe('UserCardNavbarComponent', () => {
  let component: UserCardNavbarComponent;
  let fixture: ComponentFixture<UserCardNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCardNavbarComponent]
    });
    fixture = TestBed.createComponent(UserCardNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
