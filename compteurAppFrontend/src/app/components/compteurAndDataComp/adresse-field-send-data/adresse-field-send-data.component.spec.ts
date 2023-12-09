import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresseFieldSendDataComponent } from './adresse-field-send-data.component';

describe('AdresseFieldSendDataComponent', () => {
  let component: AdresseFieldSendDataComponent;
  let fixture: ComponentFixture<AdresseFieldSendDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdresseFieldSendDataComponent]
    });
    fixture = TestBed.createComponent(AdresseFieldSendDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
