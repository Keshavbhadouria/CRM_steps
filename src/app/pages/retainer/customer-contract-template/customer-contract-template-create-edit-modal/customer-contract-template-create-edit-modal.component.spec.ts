import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContractTemplateCreateEditModalComponent } from './customer-contract-template-create-edit-modal.component';

describe('CustomerContractTemplateCreateEditModalComponent', () => {
  let component: CustomerContractTemplateCreateEditModalComponent;
  let fixture: ComponentFixture<CustomerContractTemplateCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerContractTemplateCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContractTemplateCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
