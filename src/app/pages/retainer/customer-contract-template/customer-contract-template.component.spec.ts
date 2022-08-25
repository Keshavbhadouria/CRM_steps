import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContractTemplateComponent } from './customer-contract-template.component';

describe('CustomerContractTemplateComponent', () => {
  let component: CustomerContractTemplateComponent;
  let fixture: ComponentFixture<CustomerContractTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerContractTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContractTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
