import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendStatementMainComponent } from './send-statement-main.component';

describe('SendStatementMainComponent', () => {
  let component: SendStatementMainComponent;
  let fixture: ComponentFixture<SendStatementMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendStatementMainComponent]
    });
    fixture = TestBed.createComponent(SendStatementMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
