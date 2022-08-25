import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPaymentRefundComponent } from './subscription-payment-refund.component';

describe('SubscriptionPaymentRefundComponent', () => {
  let component: SubscriptionPaymentRefundComponent;
  let fixture: ComponentFixture<SubscriptionPaymentRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionPaymentRefundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPaymentRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
