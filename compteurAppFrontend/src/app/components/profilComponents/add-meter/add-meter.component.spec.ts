import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeterComponent } from './add-meter.component';

describe('AddMeterComponent', () => {
  let component: AddMeterComponent;
  let fixture: ComponentFixture<AddMeterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMeterComponent]
    });
    fixture = TestBed.createComponent(AddMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
