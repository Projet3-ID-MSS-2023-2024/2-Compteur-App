import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyListPopupComponent } from './empty-list-popup.component';

describe('EmptyListPopupComponent', () => {
  let component: EmptyListPopupComponent;
  let fixture: ComponentFixture<EmptyListPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyListPopupComponent]
    });
    fixture = TestBed.createComponent(EmptyListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
