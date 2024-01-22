import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyListPopupComponentHistorique } from './empty-list-popup.component-historique';

describe('EmptyListPopupComponent', () => {
  let component: EmptyListPopupComponentHistorique;
  let fixture: ComponentFixture<EmptyListPopupComponentHistorique>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyListPopupComponentHistorique]
    });
    fixture = TestBed.createComponent(EmptyListPopupComponentHistorique);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
