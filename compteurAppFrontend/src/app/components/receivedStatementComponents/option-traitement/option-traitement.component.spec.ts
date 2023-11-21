import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionTraitementComponent } from './option-traitement.component';

describe('OptionTraitementComponent', () => {
  let component: OptionTraitementComponent;
  let fixture: ComponentFixture<OptionTraitementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionTraitementComponent]
    });
    fixture = TestBed.createComponent(OptionTraitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
