import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeCancelPaymentComponent } from './stripe-cancel-payment.component';

describe('StripeCancelPaymentComponent', () => {
  let component: StripeCancelPaymentComponent;
  let fixture: ComponentFixture<StripeCancelPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripeCancelPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeCancelPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
