import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalPurchaseComponent } from './paypal-purchase.component';

describe('PaypalPurchaseComponent', () => {
  let component: PaypalPurchaseComponent;
  let fixture: ComponentFixture<PaypalPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaypalPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
