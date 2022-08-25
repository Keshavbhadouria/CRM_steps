import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripePurchaseComponent } from './stripe-purchase.component';

describe('StripePurchaseComponent', () => {
  let component: StripePurchaseComponent;
  let fixture: ComponentFixture<StripePurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripePurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StripePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
