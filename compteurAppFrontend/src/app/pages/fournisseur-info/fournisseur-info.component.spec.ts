import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurInfoComponent } from './fournisseur-info.component';

describe('FournisseurInfoComponent', () => {
  let component: FournisseurInfoComponent;
  let fixture: ComponentFixture<FournisseurInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FournisseurInfoComponent]
    });
    fixture = TestBed.createComponent(FournisseurInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
