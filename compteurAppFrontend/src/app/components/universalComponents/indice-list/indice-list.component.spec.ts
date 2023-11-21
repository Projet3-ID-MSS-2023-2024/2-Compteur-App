import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiceListComponent } from './indice-list.component';

describe('IndiceListComponent', () => {
  let component: IndiceListComponent;
  let fixture: ComponentFixture<IndiceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndiceListComponent]
    });
    fixture = TestBed.createComponent(IndiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
