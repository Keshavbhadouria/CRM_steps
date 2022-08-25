import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContractTemplateViewModalComponent } from './customer-contract-template-view-modal.component';

describe('CustomerContractTemplateViewModalComponent', () => {
  let component: CustomerContractTemplateViewModalComponent;
  let fixture: ComponentFixture<CustomerContractTemplateViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerContractTemplateViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContractTemplateViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
