import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreFacturePopupComponent } from './filtre-facture-popup.component';

describe('FiltreFacturePopupComponent', () => {
  let component: FiltreFacturePopupComponent;
  let fixture: ComponentFixture<FiltreFacturePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltreFacturePopupComponent]
    });
    fixture = TestBed.createComponent(FiltreFacturePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
