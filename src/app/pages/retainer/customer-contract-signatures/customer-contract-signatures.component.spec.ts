import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContractSignaturesComponent } from './customer-contract-signatures.component';

describe('CustomerContractSignaturesComponent', () => {
  let component: CustomerContractSignaturesComponent;
  let fixture: ComponentFixture<CustomerContractSignaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerContractSignaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContractSignaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
