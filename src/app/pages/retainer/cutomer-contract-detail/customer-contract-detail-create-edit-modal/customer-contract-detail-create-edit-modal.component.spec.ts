import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContractDetailCreateEditModalComponent } from './customer-contract-detail-create-edit-modal.component';

describe('CustomerContractDetailCreateEditModalComponent', () => {
  let component: CustomerContractDetailCreateEditModalComponent;
  let fixture: ComponentFixture<CustomerContractDetailCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerContractDetailCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContractDetailCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
