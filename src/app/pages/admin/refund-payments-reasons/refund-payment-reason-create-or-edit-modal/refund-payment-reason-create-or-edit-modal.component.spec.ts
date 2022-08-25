import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundPaymentReasonCreateOrEditModalComponent } from './refund-payment-reason-create-or-edit-modal.component';

describe('RefundPaymentReasonCreateOrEditModalComponent', () => {
  let component: RefundPaymentReasonCreateOrEditModalComponent;
  let fixture: ComponentFixture<RefundPaymentReasonCreateOrEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundPaymentReasonCreateOrEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundPaymentReasonCreateOrEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
