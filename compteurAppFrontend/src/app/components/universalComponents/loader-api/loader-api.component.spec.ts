import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderAPIComponent } from './loader-api.component';

describe('LoaderAPIComponent', () => {
  let component: LoaderAPIComponent;
  let fixture: ComponentFixture<LoaderAPIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderAPIComponent]
    });
    fixture = TestBed.createComponent(LoaderAPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
