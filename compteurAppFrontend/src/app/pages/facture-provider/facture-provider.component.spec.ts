import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureProviderComponent } from './facture-provider.component';

describe('FactureProviderComponent', () => {
  let component: FactureProviderComponent;
  let fixture: ComponentFixture<FactureProviderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FactureProviderComponent]
    });
    fixture = TestBed.createComponent(FactureProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
