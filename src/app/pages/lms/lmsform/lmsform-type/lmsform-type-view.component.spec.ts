import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmsformTypeViewComponent } from './lmsform-type-view.component';

describe('LmsformTypeViewComponent', () => {
  let component: LmsformTypeViewComponent;
  let fixture: ComponentFixture<LmsformTypeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LmsformTypeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LmsformTypeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
