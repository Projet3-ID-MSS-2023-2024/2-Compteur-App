import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleLoaderComponent } from './simple-loader.component';

describe('SimpleLoaderComponent', () => {
  let component: SimpleLoaderComponent;
  let fixture: ComponentFixture<SimpleLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleLoaderComponent]
    });
    fixture = TestBed.createComponent(SimpleLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
