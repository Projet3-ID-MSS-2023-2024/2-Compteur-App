import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalPopUpComponent } from './paypal-pop-up.component';

describe('PaypalPopUpComponent', () => {
  let component: PaypalPopUpComponent;
  let fixture: ComponentFixture<PaypalPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaypalPopUpComponent]
    });
    fixture = TestBed.createComponent(PaypalPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
