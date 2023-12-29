import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryFactureClientComponent } from './history-facture-client.component';

describe('HistoryFactureClientComponent', () => {
  let component: HistoryFactureClientComponent;
  let fixture: ComponentFixture<HistoryFactureClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryFactureClientComponent]
    });
    fixture = TestBed.createComponent(HistoryFactureClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
