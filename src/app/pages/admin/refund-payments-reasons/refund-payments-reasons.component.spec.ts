import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundPaymentsReasonsComponent } from './refund-payments-reasons.component';

describe('RefundPaymentsReasonsComponent', () => {
  let component: RefundPaymentsReasonsComponent;
  let fixture: ComponentFixture<RefundPaymentsReasonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundPaymentsReasonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundPaymentsReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
