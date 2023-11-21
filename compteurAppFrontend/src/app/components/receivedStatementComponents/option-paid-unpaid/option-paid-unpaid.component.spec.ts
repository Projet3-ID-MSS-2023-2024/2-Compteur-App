import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionPaidUnpaidComponent } from './option-paid-unpaid.component';

describe('OptionPaidUnpaidComponent', () => {
  let component: OptionPaidUnpaidComponent;
  let fixture: ComponentFixture<OptionPaidUnpaidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionPaidUnpaidComponent]
    });
    fixture = TestBed.createComponent(OptionPaidUnpaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
