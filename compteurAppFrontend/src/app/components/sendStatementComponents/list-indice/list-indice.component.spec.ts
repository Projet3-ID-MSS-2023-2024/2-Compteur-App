import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIndiceComponent } from './list-indice.component';

describe('ListIndiceComponent', () => {
  let component: ListIndiceComponent;
  let fixture: ComponentFixture<ListIndiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListIndiceComponent]
    });
    fixture = TestBed.createComponent(ListIndiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
