import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundPaymentReasonViewModalComponent } from './refund-payment-reason-view-modal.component';

describe('RefundPaymentReasonViewModalComponent', () => {
  let component: RefundPaymentReasonViewModalComponent;
  let fixture: ComponentFixture<RefundPaymentReasonViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundPaymentReasonViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundPaymentReasonViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
