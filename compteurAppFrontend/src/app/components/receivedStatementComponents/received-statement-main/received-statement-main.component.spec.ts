import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedStatementMainComponent } from './received-statement-main.component';

describe('ReceivedStatementMainComponent', () => {
  let component: ReceivedStatementMainComponent;
  let fixture: ComponentFixture<ReceivedStatementMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceivedStatementMainComponent]
    });
    fixture = TestBed.createComponent(ReceivedStatementMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
