import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureReiptPopupComponent } from './facture-reipt-popup.component';

describe('FactureReiptPopupComponent', () => {
  let component: FactureReiptPopupComponent;
  let fixture: ComponentFixture<FactureReiptPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FactureReiptPopupComponent]
    });
    fixture = TestBed.createComponent(FactureReiptPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
