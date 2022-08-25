import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContractSignaturesViewModalComponent } from './customer-contract-signatures-view-modal.component';

describe('CustomerContractSignaturesViewModalComponent', () => {
  let component: CustomerContractSignaturesViewModalComponent;
  let fixture: ComponentFixture<CustomerContractSignaturesViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerContractSignaturesViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContractSignaturesViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
