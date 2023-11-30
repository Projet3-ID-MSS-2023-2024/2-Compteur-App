import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFactureComponent } from './detail-facture.component';

describe('DetailFactureComponent', () => {
  let component: DetailFactureComponent;
  let fixture: ComponentFixture<DetailFactureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailFactureComponent]
    });
    fixture = TestBed.createComponent(DetailFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
