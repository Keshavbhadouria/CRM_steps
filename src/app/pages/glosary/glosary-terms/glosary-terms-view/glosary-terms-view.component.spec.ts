import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlosaryTermsViewComponent } from './glosary-terms-view.component';

describe('GlosaryTermsViewComponent', () => {
  let component: GlosaryTermsViewComponent;
  let fixture: ComponentFixture<GlosaryTermsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlosaryTermsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlosaryTermsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
