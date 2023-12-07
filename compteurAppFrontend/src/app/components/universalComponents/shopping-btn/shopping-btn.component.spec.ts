import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingBtnComponent } from './shopping-btn.component';

describe('ShoppingBtnComponent', () => {
  let component: ShoppingBtnComponent;
  let fixture: ComponentFixture<ShoppingBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingBtnComponent]
    });
    fixture = TestBed.createComponent(ShoppingBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
