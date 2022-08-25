import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlosaryTermsComponent } from './glosary-terms.component';

describe('GlosaryTermsComponent', () => {
  let component: GlosaryTermsComponent;
  let fixture: ComponentFixture<GlosaryTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlosaryTermsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlosaryTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
