import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContractSignaturesCreateEditModalComponent } from './customer-contract-signatures-create-edit-modal.component';

describe('CustomerContractSignaturesCreateEditModalComponent', () => {
  let component: CustomerContractSignaturesCreateEditModalComponent;
  let fixture: ComponentFixture<CustomerContractSignaturesCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerContractSignaturesCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContractSignaturesCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
