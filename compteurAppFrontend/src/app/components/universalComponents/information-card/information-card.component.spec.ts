import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationCardComponent } from './information-card.component';

describe('InformationCardComponent', () => {
  let component: InformationCardComponent;
  let fixture: ComponentFixture<InformationCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationCardComponent]
    });
    fixture = TestBed.createComponent(InformationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
