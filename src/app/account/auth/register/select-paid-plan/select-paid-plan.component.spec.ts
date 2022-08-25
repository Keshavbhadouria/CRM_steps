import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPaidPlanComponent } from './select-paid-plan.component';

describe('SelectPaidPlanComponent', () => {
  let component: SelectPaidPlanComponent;
  let fixture: ComponentFixture<SelectPaidPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPaidPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPaidPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
