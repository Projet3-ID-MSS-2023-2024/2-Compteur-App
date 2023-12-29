import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFacturePricePopupComponent } from './add-facture-price-popup.component';

describe('AddFacturePricePopupComponent', () => {
  let component: AddFacturePricePopupComponent;
  let fixture: ComponentFixture<AddFacturePricePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFacturePricePopupComponent]
    });
    fixture = TestBed.createComponent(AddFacturePricePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
