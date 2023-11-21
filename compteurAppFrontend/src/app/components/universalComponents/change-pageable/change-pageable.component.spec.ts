import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePageableComponent } from './change-pageable.component';

describe('ChangePageableComponent', () => {
  let component: ChangePageableComponent;
  let fixture: ComponentFixture<ChangePageableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePageableComponent]
    });
    fixture = TestBed.createComponent(ChangePageableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
