import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyMetterComponent } from './modify-metter.component';

describe('ModifyMetterComponent', () => {
  let component: ModifyMetterComponent;
  let fixture: ComponentFixture<ModifyMetterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyMetterComponent]
    });
    fixture = TestBed.createComponent(ModifyMetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
