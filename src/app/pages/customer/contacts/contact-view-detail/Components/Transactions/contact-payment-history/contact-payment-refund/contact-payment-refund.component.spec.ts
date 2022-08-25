import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPaymentRefundComponent } from './contact-payment-refund.component';

describe('ContactPaymentRefundComponent', () => {
  let component: ContactPaymentRefundComponent;
  let fixture: ComponentFixture<ContactPaymentRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactPaymentRefundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPaymentRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
