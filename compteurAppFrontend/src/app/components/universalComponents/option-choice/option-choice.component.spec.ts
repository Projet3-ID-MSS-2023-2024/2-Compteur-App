import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionChoiceComponent } from './option-choice.component';

describe('OptionPaidUnpaidComponent', () => {
  let component: OptionChoiceComponent;
  let fixture: ComponentFixture<OptionChoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionChoiceComponent]
    });
    fixture = TestBed.createComponent(OptionChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
