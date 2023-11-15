import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresseAddComponent } from './adresse-add.component';

describe('AdresseAddComponent', () => {
  let component: AdresseAddComponent;
  let fixture: ComponentFixture<AdresseAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdresseAddComponent]
    });
    fixture = TestBed.createComponent(AdresseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
