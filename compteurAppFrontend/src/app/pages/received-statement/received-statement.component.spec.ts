import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedStatementComponent } from './received-statement.component';

describe('ReceivedStatementComponent', () => {
  let component: ReceivedStatementComponent;
  let fixture: ComponentFixture<ReceivedStatementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceivedStatementComponent]
    });
    fixture = TestBed.createComponent(ReceivedStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
