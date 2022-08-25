import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripePaymentResultComponent } from './stripe-payment-result.component';

describe('StripePaymentResultComponent', () => {
  let component: StripePaymentResultComponent;
  let fixture: ComponentFixture<StripePaymentResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripePaymentResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StripePaymentResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
