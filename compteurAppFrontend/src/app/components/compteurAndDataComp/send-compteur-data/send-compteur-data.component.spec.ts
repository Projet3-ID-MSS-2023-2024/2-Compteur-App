import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCompteurDataComponent } from './send-compteur-data.component';

describe('SendCompteurDataComponent', () => {
  let component: SendCompteurDataComponent;
  let fixture: ComponentFixture<SendCompteurDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendCompteurDataComponent]
    });
    fixture = TestBed.createComponent(SendCompteurDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
