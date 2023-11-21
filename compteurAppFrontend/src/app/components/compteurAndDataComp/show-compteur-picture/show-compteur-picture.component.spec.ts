import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCompteurPictureComponent } from './show-compteur-picture.component';

describe('ShowCompteurPictureComponent', () => {
  let component: ShowCompteurPictureComponent;
  let fixture: ComponentFixture<ShowCompteurPictureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowCompteurPictureComponent]
    });
    fixture = TestBed.createComponent(ShowCompteurPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
