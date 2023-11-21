import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendStatementComponent } from './send-statement.component';

describe('SendStatementComponent', () => {
  let component: SendStatementComponent;
  let fixture: ComponentFixture<SendStatementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendStatementComponent]
    });
    fixture = TestBed.createComponent(SendStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
