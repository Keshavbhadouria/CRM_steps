import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContractDetailViewModalComponent } from './customer-contract-detail-view-modal.component';

describe('CustomerContractDetailViewModalComponent', () => {
  let component: CustomerContractDetailViewModalComponent;
  let fixture: ComponentFixture<CustomerContractDetailViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerContractDetailViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContractDetailViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
