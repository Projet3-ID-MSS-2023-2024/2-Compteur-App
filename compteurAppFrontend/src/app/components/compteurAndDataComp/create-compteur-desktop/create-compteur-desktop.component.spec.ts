import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompteurDesktopComponent } from './create-compteur-desktop.component';

describe('CreateCompteurDesktopComponent', () => {
  let component: CreateCompteurDesktopComponent;
  let fixture: ComponentFixture<CreateCompteurDesktopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCompteurDesktopComponent]
    });
    fixture = TestBed.createComponent(CreateCompteurDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
